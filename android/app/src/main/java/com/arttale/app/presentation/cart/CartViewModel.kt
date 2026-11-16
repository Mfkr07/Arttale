package com.arttale.app.presentation.cart

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.arttale.app.domain.model.CartItem
import com.arttale.app.domain.usecase.ClearCartUseCase
import com.arttale.app.domain.usecase.GetCartUseCase
import com.arttale.app.domain.usecase.RemoveFromCartUseCase
import com.arttale.app.domain.usecase.UpdateCartQtyUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

data class CartUiState(
    val items: List<CartItem> = emptyList(),
    val subtotal: Long = 0L,
    val totalTip: Long = 0L,
    val total: Long = 0L,
    val totalQuantity: Int = 0
)

@HiltViewModel
class CartViewModel @Inject constructor(
    getCartUseCase: GetCartUseCase,
    private val updateCartQtyUseCase: UpdateCartQtyUseCase,
    private val removeFromCartUseCase: RemoveFromCartUseCase,
    private val clearCartUseCase: ClearCartUseCase
) : ViewModel() {

    val uiState: StateFlow<CartUiState> = getCartUseCase().map { list ->
        val subtotal = list.sumOf { it.basePrice * it.quantity }
        val tip = list.sumOf { it.tip * it.quantity }
        val total = subtotal + tip
        val count = list.sumOf { it.quantity }
        CartUiState(
            items = list,
            subtotal = subtotal,
            totalTip = tip,
            total = total,
            totalQuantity = count
        )
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = CartUiState()
    )

    fun onQuantityChange(id: String, newQty: Int) {
        viewModelScope.launch {
            updateCartQtyUseCase(id, newQty)
        }
    }

    fun onRemoveItem(id: String) {
        viewModelScope.launch {
            removeFromCartUseCase(id)
        }
    }

    fun onClearCart() {
        viewModelScope.launch {
            clearCartUseCase()
        }
    }
}
