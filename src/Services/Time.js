export function formatDate(date) {
    const datetime = date.getFullYear()+"-"+(date.getUTCMonth()).toString().padStart(2,"0")+"-"+date.getDate()
    return datetime
}