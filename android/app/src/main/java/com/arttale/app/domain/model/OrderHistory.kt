package com.arttale.app.domain.model

data class OrderHistory(
    val id: String,
    val productTitle: String,
    val productEmoji: String,
    val productColorHex: Long,
    val quantity: Int,
    val totalPrice: Long,
    val status: OrderStatus,
    val date: String,
    val size: String,
    val color: String
)

enum class OrderStatus(val label: String, val colorHex: Long) {
    PENDING("Menunggu", 0xFFFDCB6E),
    PROCESSING("Diproses", 0xFF6C5CE7),
    SHIPPED("Dikirim", 0xFF55EFC4),
    DELIVERED("Selesai", 0xFF00B894),
    CANCELLED("Dibatalkan", 0xFFFF7675)
}
