package com.arttale.app.presentation.navigation

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.arttale.app.presentation.cart.CartScreen
import com.arttale.app.presentation.catalog.CatalogScreen
import com.arttale.app.presentation.checkout.CheckoutScreen
import com.arttale.app.presentation.creator.UploadStudioScreen
import com.arttale.app.presentation.detail.ProductDetailScreen
import com.arttale.app.presentation.profile.ProfileScreen
import com.arttale.app.presentation.tribes.TribesScreen

@Composable
fun NavGraph(
    navController: NavHostController,
    modifier: Modifier = Modifier
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Catalog.route,
        modifier = modifier
    ) {
        composable(Screen.Catalog.route) {
            CatalogScreen(
                onNavigateToDetail = { id ->
                    navController.navigate(Screen.ProductDetail.createRoute(id))
                },
                onNavigateBottom = { screen ->
                    navController.navigate(screen.route) {
                        popUpTo(Screen.Catalog.route) { saveState = true }
                        launchSingleTop = true
                        restoreState = true
                    }
                }
            )
        }

        composable(
            route = Screen.ProductDetail.route,
            arguments = listOf(navArgument("productId") { type = NavType.IntType })
        ) {
            ProductDetailScreen(
                onNavigateBack = { navController.popBackStack() },
                onNavigateToCart = {
                    navController.navigate(Screen.Cart.route)
                }
            )
        }

        composable(Screen.Cart.route) {
            CartScreen(
                onNavigateToCheckout = {
                    navController.navigate(Screen.Checkout.route)
                },
                onNavigateToCatalog = {
                    navController.navigate(Screen.Catalog.route)
                },
                onNavigateBottom = { screen ->
                    navController.navigate(screen.route) {
                        popUpTo(Screen.Catalog.route) { saveState = true }
                        launchSingleTop = true
                        restoreState = true
                    }
                }
            )
        }

        composable(Screen.Checkout.route) {
            CheckoutScreen(
                onNavigateBack = { navController.popBackStack() },
                onOrderSuccess = {
                    navController.navigate(Screen.Catalog.route) {
                        popUpTo(Screen.Catalog.route) { inclusive = true }
                    }
                }
            )
        }

        composable(Screen.Tribes.route) {
            TribesScreen(
                onNavigateBottom = { screen ->
                    navController.navigate(screen.route) {
                        popUpTo(Screen.Catalog.route) { saveState = true }
                        launchSingleTop = true
                        restoreState = true
                    }
                }
            )
        }

        composable(Screen.UploadStudio.route) {
            UploadStudioScreen(
                onNavigateBottom = { screen ->
                    navController.navigate(screen.route) {
                        popUpTo(Screen.Catalog.route) { saveState = true }
                        launchSingleTop = true
                        restoreState = true
                    }
                }
            )
        }

        composable(Screen.Profile.route) {
            ProfileScreen(
                onNavigateBottom = { screen ->
                    navController.navigate(screen.route) {
                        popUpTo(Screen.Catalog.route) { saveState = true }
                        launchSingleTop = true
                        restoreState = true
                    }
                }
            )
        }
    }
}
