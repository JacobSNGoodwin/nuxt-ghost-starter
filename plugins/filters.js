import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (dateString) => {
  return moment(dateString).format('dddd, MMMM Do, YYYY')
})
