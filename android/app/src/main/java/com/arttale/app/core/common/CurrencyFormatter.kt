package com.arttale.app.core.common

import java.text.NumberFormat
import java.util.Locale

fun Long.toRupiah(): String {
    val formatter = NumberFormat.getNumberInstance(Locale("id", "ID"))
    return "Rp ${formatter.format(this)}"
}

fun Int.toRupiah(): String = this.toLong().toRupiah()
