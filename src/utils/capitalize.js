const capitalize = string => {
    let arr = string.split(" ")
    for (let word of arr) {
        arr[arr.indexOf(word)] = word.charAt(0).toUpperCase() + word.substring(1)
    }
    return arr.join(" ")
}

export default capitalize