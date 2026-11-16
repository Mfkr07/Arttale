package com.arttale.app.domain.usecase

import com.arttale.app.domain.model.CartItem
import com.arttale.app.domain.repository.CartRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class GetCartUseCase @Inject constructor(
    private val repository: CartRepository
) {
    operator fun invoke(): Flow<List<CartItem>> = repository.getCartItems()
}

class AddToCartUseCase @Inject constructor(
    private val repository: CartRepository
) {
    suspend operator fun invoke(item: CartItem) = repository.addToCart(item)
}

class UpdateCartQtyUseCase @Inject constructor(
    private val repository: CartRepository
) {
    suspend operator fun invoke(id: String, newQty: Int) = repository.updateQuantity(id, newQty)
}

class RemoveFromCartUseCase @Inject constructor(
    private val repository: CartRepository
) {
    suspend operator fun invoke(id: String) = repository.removeItem(id)
}

class ClearCartUseCase @Inject constructor(
    private val repository: CartRepository
) {
    suspend operator fun invoke() = repository.clearCart()
}
