import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (dateString) => {
  moment(dateString).format('MMMM Do YYYY, h:mm:ss a')
})
