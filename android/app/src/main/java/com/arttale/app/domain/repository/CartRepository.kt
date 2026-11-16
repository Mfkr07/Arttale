package com.arttale.app.domain.repository

import com.arttale.app.domain.model.CartItem
import kotlinx.coroutines.flow.Flow

interface CartRepository {
    fun getCartItems(): Flow<List<CartItem>>
    suspend fun addToCart(item: CartItem)
    suspend fun updateQuantity(id: String, newQty: Int)
    suspend fun removeItem(id: String)
    suspend fun clearCart()
}
