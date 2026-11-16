package com.arttale.app.domain.model

data class CartItem(
    val id: String,
    val productId: Int,
    val title: String,
    val artist: String,
    val emoji: String,
    val color: String,
    val size: String,
    val quality: String,
    val basePrice: Long,
    val tip: Long,
    val quantity: Int
) {
    val totalPerItem: Long get() = (basePrice + tip) * quantity
}
