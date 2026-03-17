<template>
  <v-form @submit.prevent="handleSearch" ref="searchForm" class="hotel-search-form">
    <!-- Main Search Row -->
    <v-row class="mb-4 align-center">
      <!-- Location -->
      <v-col cols="12" md="5">
        <v-text-field
          v-model="searchData.location"
          label="Destination"
          placeholder=""
          prepend-inner-icon="mdi-map-marker-outline"
          variant="outlined"
          density="comfortable"
          :rules="[requiredRule]"
          hide-details="auto"
          clearable
        />
      </v-col>

      <!-- Check-in Date -->
      <v-col cols="12" sm="6" md="3">
        <v-menu
          v-model="checkInMenu"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              :model-value="formattedCheckIn"
              label="Check-in"
              placeholder=""
              prepend-inner-icon="mdi-calendar"
              variant="outlined"
              density="comfortable"
              readonly
              v-bind="props"
              :rules="[requiredRule]"
              hide-details="auto"
              class="date-field"
            />
          </template>
          <v-date-picker
            v-model="searchData.checkIn"
            :min="minDate"
            @update:model-value="checkInMenu = false"
            color="primary"
          />
        </v-menu>
      </v-col>

      <!-- Check-out Date -->
      <v-col cols="12" sm="6" md="3">
        <v-menu
          v-model="checkOutMenu"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              :model-value="formattedCheckOut"
              label="Check-out"
              placeholder=""
              prepend-inner-icon="mdi-calendar"
              variant="outlined"
              density="comfortable"
              readonly
              v-bind="props"
              :rules="[requiredRule, checkOutRule]"
              :disabled="!searchData.checkIn"
              hide-details="auto"
              class="date-field"
            />
          </template>
          <v-date-picker
            v-model="searchData.checkOut"
            :min="minCheckOutDate"
            @update:model-value="checkOutMenu = false"
            color="primary"
          />
        </v-menu>
      </v-col>

      <!-- Guests Selector -->
      <v-col cols="12" md="1">
        <v-menu v-model="guestsMenu">
          <template v-slot:activator="{ props }">
            <v-text-field
              :model-value="guestSummary"
              label="Guests"
              placeholder="Guests"
              prepend-inner-icon="mdi-account-group"
              variant="outlined"
              density="comfortable"
              readonly
              v-bind="props"
              hide-details="auto"
              class="guests-field"
            />
          </template>
          
          <v-card class="pa-4" width="320">
            <!-- Rooms -->
            <div class="mb-4">
              <div class="text-subtitle-2 font-weight-medium mb-2">Rooms</div>
              <div class="d-flex align-center">
                <v-btn
                  icon
                  variant="outlined"
                  size="small"
                  :disabled="searchData.guests.rooms <= 1"
                  @click="searchData.guests.rooms--"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span class="mx-4 text-h6">{{ searchData.guests.rooms }}</span>
                <v-btn
                  icon
                  variant="outlined"
                  size="small"
                  :disabled="searchData.guests.rooms >= 4"
                  @click="searchData.guests.rooms++"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </div>

            <v-divider class="my-3" />

            <!-- Guest Types -->
            <div v-for="guest in guestTypes" :key="guest.type" class="mb-3">
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="text-body-2 font-weight-medium">{{ guest.label }}</div>
                  <div class="text-caption text-disabled">{{ guest.description }}</div>
                </div>
                <div class="d-flex align-center">
                  <v-btn
                    icon
                    variant="outlined"
                    size="small"
                    :disabled="searchData.guests[guest.type] <= guest.min"
                    @click="searchData.guests[guest.type]--"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-4 text-body-1 font-weight-medium">
                    {{ searchData.guests[guest.type] }}
                  </span>
                  <v-btn
                    icon
                    variant="outlined"
                    size="small"
                    :disabled="searchData.guests[guest.type] >= guest.max"
                    @click="searchData.guests[guest.type]++"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>

            <v-divider class="my-3" />
            
            <div class="d-flex justify-space-between align-center mb-3">
              <span class="text-body-2 font-weight-medium">Total Guests</span>
              <span class="text-h6 text-primary">{{ searchData.guests.total }}</span>
            </div>
            
            <v-btn
              color="primary"
              block
              @click="guestsMenu = false"
            >
              Done
            </v-btn>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>

    <!-- Search Button -->
    <v-row>
      <v-col cols="12">
        <v-btn
          type="submit"
          color="primary"
          size="large"
          :loading="loading"
          block
          rounded="lg"
          prepend-icon="mdi-magnify"
          class="search-btn"
        >
          Search Hotels
        </v-btn>
      </v-col>
    </v-row>

    <!-- Quick Actions -->
    <v-row v-if="showQuickActions" class="mt-4">
      <v-col cols="12">
        <div class="d-flex flex-wrap gap-2 justify-center">
          <v-chip
            v-for="destination in popularDestinations"
            :key="destination"
            variant="outlined"
            size="small"
            @click="selectDestination(destination)"
            class="cursor-pointer"
          >
            <v-icon start size="x-small">mdi-map-marker</v-icon>
            {{ destination }}
          </v-chip>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { format, addDays, parseISO } from 'date-fns'

const router = useRouter()
const loading = ref(false)
const searchForm = ref(null)
const checkInMenu = ref(false)
const checkOutMenu = ref(false)
const guestsMenu = ref(false)
const showQuickActions = ref(true)

// Search data model
const searchData = reactive({
  location: '',
  checkIn: '',
  checkOut: '',
  guests: {
    adults: 2,
    children: 0,
    infants: 0,
    rooms: 1,
    get total() {
      return this.adults + this.children + this.infants
    }
  }
})

// Validation rules
const requiredRule = value => !!value || 'Required'
const checkOutRule = value => {
  if (!searchData.checkIn || !value) return true
  return value > searchData.checkIn || 'Must be after check-in'
}

// Computed properties
const minDate = computed(() => format(new Date(), 'yyyy-MM-dd'))
const minCheckOutDate = computed(() => {
  if (!searchData.checkIn) return minDate.value
  return format(addDays(parseISO(searchData.checkIn), 1), 'yyyy-MM-dd')
})

const formattedCheckIn = computed(() => {
  return searchData.checkIn ? format(parseISO(searchData.checkIn), 'MMM dd') : ''
})

const formattedCheckOut = computed(() => {
  return searchData.checkOut ? format(parseISO(searchData.checkOut), 'MMM dd') : ''
})

const guestSummary = computed(() => {
  const { infants, total } = searchData.guests
  if (total === 0) return ''
  
  let summary = `${total}`
  if (infants > 0) summary += ` (${infants} infant${infants > 1 ? 's' : ''})`
  return summary
})

// Guest configuration
const guestTypes = [
  { type: 'adults', label: 'Adults', description: 'Age 13+', min: 1, max: 10 },
  { type: 'children', label: 'Children', description: 'Age 2-12', min: 0, max: 10 },
  { type: 'infants', label: 'Infants', description: 'Under 2', min: 0, max: 5 }
]

// Popular destinations
const popularDestinations = ['New York', 'Los Angeles', 'Miami', 'Las Vegas', 'Chicago']

// Methods
const handleSearch = async () => {
  const { valid } = await searchForm.value.validate()
  
  if (!valid) {
    return
  }

  loading.value = true

  try {
    await router.push({
      name: 'Hotels',
      query: {
        location: searchData.location,
        checkIn: searchData.checkIn,
        checkOut: searchData.checkOut,
        guests: JSON.stringify(searchData.guests)
      }
    })
  } finally {
    loading.value = false
  }
}

const selectDestination = (destination) => {
  searchData.location = destination
}
</script>

