package com.arttale.app.presentation.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CloudUpload
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.Palette
import androidx.compose.material.icons.filled.ShoppingBag
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.arttale.app.core.theme.CreativeViolet
import com.arttale.app.core.theme.InkBlack
import com.arttale.app.core.theme.InkMuted
import com.arttale.app.core.theme.PaperBackground
import com.arttale.app.core.theme.PaperCard
import com.arttale.app.presentation.navigation.Screen

sealed class NavItem(val screen: Screen, val title: String, val icon: ImageVector) {
    data object Catalog : NavItem(Screen.Catalog, "Karya", Icons.Default.Palette)
    data object Tribes : NavItem(Screen.Tribes, "Tribes", Icons.Default.LocalFireDepartment)
    data object Cart : NavItem(Screen.Cart, "Keranjang", Icons.Default.ShoppingBag)
    data object Studio : NavItem(Screen.UploadStudio, "Studio", Icons.Default.CloudUpload)
}

@Composable
fun BottomNavBar(
    currentRoute: String?,
    cartCount: Int,
    onNavigate: (Screen) -> Unit,
    modifier: Modifier = Modifier
) {
    val items = listOf(NavItem.Catalog, NavItem.Tribes, NavItem.Cart, NavItem.Studio)

    NavigationBar(
        modifier = modifier
            .fillMaxWidth()
            .drawBehind {
                // Top border line
                drawLine(
                    color = InkBlack,
                    start = Offset(0f, 0f),
                    end = Offset(size.width, 0f),
                    strokeWidth = 2.dp.toPx()
                )
            },
        containerColor = PaperBackground,
        tonalElevation = 0.dp
    ) {
        items.forEach { item ->
            val isSelected = currentRoute == item.screen.route

            NavigationBarItem(
                selected = isSelected,
                onClick = { onNavigate(item.screen) },
                icon = {
                    if (item is NavItem.Cart && cartCount > 0) {
                        BadgedBox(
                            badge = {
                                Badge(
                                    containerColor = CreativeViolet,
                                    contentColor = PaperCard
                                ) {
                                    Text(text = cartCount.toString(), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                                }
                            }
                        ) {
                            Icon(imageVector = item.icon, contentDescription = item.title)
                        }
                    } else {
                        Icon(imageVector = item.icon, contentDescription = item.title)
                    }
                },
                label = {
                    Text(
                        text = item.title,
                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                        fontSize = 11.sp
                    )
                },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = PaperCard,
                    selectedTextColor = InkBlack,
                    indicatorColor = CreativeViolet,
                    unselectedIconColor = InkMuted,
                    unselectedTextColor = InkMuted
                )
            )
        }
    }
}
