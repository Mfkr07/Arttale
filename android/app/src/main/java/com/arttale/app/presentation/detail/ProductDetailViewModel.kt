package com.arttale.app.presentation.detail

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.arttale.app.domain.model.CartItem
import com.arttale.app.domain.model.Product
import com.arttale.app.domain.model.ProductColor
import com.arttale.app.domain.model.ProductQuality
import com.arttale.app.domain.usecase.AddToCartUseCase
import com.arttale.app.domain.usecase.GetProductByIdUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.util.UUID
import javax.inject.Inject

data class ProductDetailUiState(
    val product: Product? = null,
    val selectedColor: ProductColor? = null,
    val selectedSize: String = "M",
    val selectedQuality: ProductQuality? = null,
    val selectedTip: Long = 5_000L,
    val quantity: Int = 1,
    val isLoading: Boolean = true
) {
    val currentBasePrice: Long
        get() = (product?.price ?: 0L) + (selectedQuality?.additionalPrice ?: 0L)

    val totalPrice: Long
        get() = (currentBasePrice + selectedTip) * quantity
}

@HiltViewModel
class ProductDetailViewModel @Inject constructor(
    private val getProductByIdUseCase: GetProductByIdUseCase,
    private val addToCartUseCase: AddToCartUseCase,
    savedStateHandle: SavedStateHandle
) : ViewModel() {

    private val productId: Int = checkNotNull(savedStateHandle["productId"]).toString().toInt()

    private val _uiState = MutableStateFlow(ProductDetailUiState())
    val uiState: StateFlow<ProductDetailUiState> = _uiState.asStateFlow()

    private val _eventFlow = MutableSharedFlow<String>()
    val eventFlow: SharedFlow<String> = _eventFlow.asSharedFlow()

    init {
        loadProduct()
    }

    private fun loadProduct() {
        viewModelScope.launch {
            val p = getProductByIdUseCase(productId)
            if (p != null) {
                _uiState.update {
                    it.copy(
                        product = p,
                        selectedColor = p.availableColors.firstOrNull(),
                        selectedQuality = p.availableQualities.firstOrNull(),
                        isLoading = false
                    )
                }
            } else {
                _uiState.update { it.copy(isLoading = false) }
            }
        }
    }

    fun onColorSelected(color: ProductColor) {
        _uiState.update { it.copy(selectedColor = color) }
    }

    fun onSizeSelected(size: String) {
        _uiState.update { it.copy(selectedSize = size) }
    }

    fun onQualitySelected(quality: ProductQuality) {
        _uiState.update { it.copy(selectedQuality = quality) }
    }

    fun onTipSelected(tip: Long) {
        _uiState.update { it.copy(selectedTip = tip) }
    }

    fun onQuantityChanged(delta: Int) {
        _uiState.update {
            val next = (it.quantity + delta).coerceAtLeast(1)
            it.copy(quantity = next)
        }
    }

    fun addToCart(onSuccess: () -> Unit) {
        val s = _uiState.value
        val p = s.product ?: return
        viewModelScope.launch {
            val item = CartItem(
                id = UUID.randomUUID().toString(),
                productId = p.id,
                title = p.displayTitle,
                artist = p.artist,
                emoji = p.emoji,
                color = s.selectedColor?.name ?: "Hitam",
                size = s.selectedSize,
                quality = s.selectedQuality?.label ?: "Standard",
                basePrice = s.currentBasePrice,
                tip = s.selectedTip,
                quantity = s.quantity
            )
            addToCartUseCase(item)
            _eventFlow.emit("Berhasil ditambahkan ke keranjang!")
            onSuccess()
        }
    }
}
