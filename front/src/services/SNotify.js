import {SnotifyService} from 'vue-snotify'

SnotifyService.setConfig({}, {
  position: 'rightTop'
})

function success (title, content) {
  return SnotifyService.success(content, title, {
    timeout: 3000,
    showProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false
  })
}

function warning (title, content) {
  return SnotifyService.warning(content, title, {
    timeout: 3000,
    showProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false
  })
}

function danger (title, content) {
  return SnotifyService.error(content, title, {
    timeout: 3000,
    showProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false
  })
}

function info (title, content) {
  return SnotifyService.info(content, title, {
    timeout: 3000,
    showProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false
  })
}

export default { success, warning, danger, info }
