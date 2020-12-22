// function for checking posting date
const dateFrom = (seconds) => {
    let localTimeStamp = Math.floor(Date.now() / 1000);
    let result
    if (seconds.timestamp) {
        result = localTimeStamp - seconds.timestamp.seconds // in seconds
    } else {
        return null
    }

    let days = result/86400
    let hours = result/3600
    let minutes = result/60

    if (days > 1) {
        let showDays = Math.floor(days)
            if (showDays === 1) {
                return (`${showDays} day ago`)
            } else {
                return (`${showDays} days ago`)
            }
    } else 
    if (days < 1 && hours > 1) {
        let showHours = Math.floor(hours)
            if (showHours === 1) {
                return (`${showHours} hour ago`)
            } else {
                return (`${showHours} hours ago`)
            }
    } else 
    if (hours < 1 && minutes > 1){
        let showMinutes = Math.floor(minutes)
            if (showMinutes === 1) {
                return (`${showMinutes} minute ago`)
            } else {
                return (`${showMinutes} minutes ago`)
            }
    } else
    if (minutes < 1){
        return (`A few seconds ago`)
    }
}

export default dateFrom;