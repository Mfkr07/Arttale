package com.arttale.app.presentation.catalog

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.arttale.app.domain.model.Product
import com.arttale.app.domain.usecase.GetCartUseCase
import com.arttale.app.domain.usecase.GetProductsUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import javax.inject.Inject

data class CatalogUiState(
    val products: List<Product> = emptyList(),
    val searchQuery: String = "",
    val selectedCategory: String = "Semua",
    val selectedStyle: String = "Semua",
    val cartCount: Int = 0,
    val isLoading: Boolean = false
)

@HiltViewModel
class CatalogViewModel @Inject constructor(
    getProductsUseCase: GetProductsUseCase,
    getCartUseCase: GetCartUseCase
) : ViewModel() {

    private val _searchQuery = MutableStateFlow("")
    private val _selectedCategory = MutableStateFlow("Semua")
    private val _selectedStyle = MutableStateFlow("Semua")

    private val _allProducts = getProductsUseCase()
    private val _cartCount = getCartUseCase().map { list -> list.sumOf { it.quantity } }

    val uiState: StateFlow<CatalogUiState> = combine(
        _allProducts,
        _searchQuery,
        _selectedCategory,
        _selectedStyle,
        _cartCount
    ) { products, query, category, style, cartCount ->
        val filtered = products.filter { p ->
            val matchQuery = query.isEmpty() ||
                    p.title.contains(query, ignoreCase = true) ||
                    p.artist.contains(query, ignoreCase = true)
            val matchCategory = category == "Semua" || p.category.equals(category, ignoreCase = true)
            val matchStyle = style == "Semua" || p.style.equals(style, ignoreCase = true)
            matchQuery && matchCategory && matchStyle
        }
        CatalogUiState(
            products = filtered,
            searchQuery = query,
            selectedCategory = category,
            selectedStyle = style,
            cartCount = cartCount,
            isLoading = false
        )
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = CatalogUiState(isLoading = true)
    )

    fun onSearchQueryChanged(newQuery: String) {
        _searchQuery.value = newQuery
    }

    fun onCategorySelected(category: String) {
        _selectedCategory.value = category
    }

    fun onStyleSelected(style: String) {
        _selectedStyle.value = style
    }
}
