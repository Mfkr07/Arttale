package com.arttale.app.presentation.navigation

sealed class Screen(val route: String) {
    data object Catalog : Screen("catalog")
    data object ProductDetail : Screen("product_detail/{productId}") {
        fun createRoute(productId: Int) = "product_detail/$productId"
    }
    data object Cart : Screen("cart")
    data object Checkout : Screen("checkout")
    data object Tribes : Screen("tribes")
    data object UploadStudio : Screen("upload_studio")
}
