<template>
  <v-footer color="grey darken-4" dark class="pt-8 pb-4">
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <h4 class="text-h6 mb-4">SkyBooker</h4>
          <p class="text-body-2 text-grey lighten-1">
            Your one-stop solution for all travel needs. Book flights, hotels, cars, and more.
          </p>
        </v-col>
        <v-col cols="12" md="3">
          <h4 class="text-subtitle-1 mb-4">Quick Links</h4>
          <v-list dense nav class="pa-0 bg-transparent">
            <v-list-item to="/flights" class="px-0">Flights</v-list-item>
            <v-list-item to="/hotels" class="px-0">Hotels</v-list-item>
            <v-list-item to="/cars" class="px-0">Car Rental</v-list-item>
            <v-list-item to="/taxi" class="px-0">Taxi</v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="3">
          <h4 class="text-subtitle-1 mb-4">Support</h4>
          <v-list dense nav class="pa-0 bg-transparent">
            <v-list-item class="px-0">Help Center</v-list-item>
            <v-list-item class="px-0">Contact Us</v-list-item>
            <v-list-item class="px-0">Privacy Policy</v-list-item>
            <v-list-item class="px-0">Terms of Service</v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="3">
          <h4 class="text-subtitle-1 mb-4">Contact</h4>
          <p class="text-body-2 mb-2">
            <v-icon small class="mr-2">mdi-email</v-icon>
            support@skybooker.com
          </p>
          <p class="text-body-2 mb-2">
            <v-icon small class="mr-2">mdi-phone</v-icon>
            +1 (800) 123-4567
          </p>
          <div class="mt-4">
            <v-btn icon small class="mr-2">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon small class="mr-2">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon small>
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <div class="text-center text-body-2 text-grey">
        &copy; {{ new Date().getFullYear() }} SkyBooker. All rights reserved.
      </div>
    </v-container>
  </v-footer>
</template>