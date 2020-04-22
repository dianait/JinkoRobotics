qr_codes = {
    "65342vgs": "robot_id_1",
    "34tggf": "robot_id_2"
}

qr_sample = "34tggf"

for (x in qr_codes) {
    if (qr_sample == x) {
        console.log("good")
        console.log(qr_codes[x])
    }
}