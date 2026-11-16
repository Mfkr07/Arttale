package com.arttale.app.presentation.catalog

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.arttale.app.core.common.toRupiah
import com.arttale.app.core.theme.CreativeViolet
import com.arttale.app.core.theme.CreativeVioletSoft
import com.arttale.app.core.theme.InkBlack
import com.arttale.app.core.theme.InkBorder
import com.arttale.app.core.theme.InkMuted
import com.arttale.app.core.theme.PaperBackground
import com.arttale.app.core.theme.PaperCard
import com.arttale.app.core.theme.WarmYellow
import com.arttale.app.core.theme.sketchBorder
import com.arttale.app.core.theme.sketchBorderLight
import com.arttale.app.domain.model.Product
import com.arttale.app.presentation.components.BottomNavBar
import com.arttale.app.presentation.components.SketchCard
import com.arttale.app.presentation.navigation.Screen

@Composable
fun CatalogScreen(
    onNavigateToDetail: (Int) -> Unit,
    onNavigateBottom: (Screen) -> Unit,
    viewModel: CatalogViewModel = hiltViewModel()
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()

    val categories = listOf("Semua", "Pakaian", "Aksesoris", "Stiker", "Home & Art")
    val styles = listOf("Semua", "Ilustrasi", "Tipografi", "Minimalis", "Vintage", "Parodi")

    Scaffold(
        containerColor = PaperBackground,
        bottomBar = {
            BottomNavBar(
                currentRoute = Screen.Catalog.route,
                cartCount = state.cartCount,
                onNavigate = onNavigateBottom
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            // Header: The Artist's Sketchbook Branding
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "Arttale",
                        fontWeight = FontWeight.Black,
                        fontSize = 28.sp,
                        letterSpacing = (-0.5).sp,
                        color = InkBlack
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Box(
                        modifier = Modifier
                            .sketchBorderLight(strokeWidth = 1.dp, cornerRadius = 6.dp)
                            .clip(RoundedCornerShape(6.dp))
                            .background(WarmYellow)
                            .padding(horizontal = 6.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = "POD KREATIF",
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 9.sp,
                            color = InkBlack
                        )
                    }
                }
                Text(
                    text = "Coretanmu. Dicetak. Dicintai.",
                    fontSize = 13.sp,
                    color = InkMuted,
                    fontWeight = FontWeight.Medium
                )
            }

            // Search Bar
            OutlinedTextField(
                value = state.searchQuery,
                onValueChange = viewModel::onSearchQueryChanged,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp)
                    .sketchBorder(strokeWidth = 1.5.dp, shadowOffset = 3.dp, cornerRadius = 10.dp),
                placeholder = { Text("Cari karya, kaos, stiker, seniman...", fontSize = 13.sp) },
                leadingIcon = {
                    Icon(imageVector = Icons.Default.Search, contentDescription = "Search", tint = InkBlack)
                },
                singleLine = true,
                colors = OutlinedTextFieldDefaults.colors(
                    focusedContainerColor = PaperCard,
                    unfocusedContainerColor = PaperCard,
                    focusedBorderColor = Color.Transparent,
                    unfocusedBorderColor = Color.Transparent
                ),
                shape = RoundedCornerShape(10.dp)
            )

            Spacer(modifier = Modifier.height(12.dp))

            // Categories horizontal chip row
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState())
                    .padding(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                categories.forEach { cat ->
                    val isSelected = state.selectedCategory == cat
                    Box(
                        modifier = Modifier
                            .sketchBorder(
                                strokeWidth = 1.5.dp,
                                borderColor = if (isSelected) CreativeViolet else InkBorder,
                                shadowOffset = if (isSelected) 2.dp else 0.dp,
                                cornerRadius = 20.dp
                            )
                            .clip(RoundedCornerShape(20.dp))
                            .background(if (isSelected) CreativeViolet else PaperCard)
                            .clickable { viewModel.onCategorySelected(cat) }
                            .padding(horizontal = 14.dp, vertical = 7.dp)
                    ) {
                        Text(
                            text = cat,
                            fontSize = 12.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                            color = if (isSelected) PaperCard else InkBlack
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            // Art Style filter chip row
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState())
                    .padding(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                styles.forEach { style ->
                    val isSelected = state.selectedStyle == style
                    Box(
                        modifier = Modifier
                            .sketchBorderLight(
                                strokeWidth = 1.dp,
                                borderColor = if (isSelected) InkBlack else Color.LightGray,
                                cornerRadius = 14.dp
                            )
                            .clip(RoundedCornerShape(14.dp))
                            .background(if (isSelected) WarmYellow else PaperBackground)
                            .clickable { viewModel.onStyleSelected(style) }
                            .padding(horizontal = 10.dp, vertical = 4.dp)
                    ) {
                        Text(
                            text = if (style == "Semua") "Semua Gaya" else style,
                            fontSize = 11.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                            color = InkBlack
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            // Product Grid
            if (state.isLoading) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator(color = CreativeViolet)
                }
            } else if (state.products.isEmpty()) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(24.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Tidak ada karya yang cocok dengan pencarian.",
                        color = InkMuted,
                        fontSize = 14.sp
                    )
                }
            } else {
                LazyVerticalGrid(
                    columns = GridCells.Fixed(2),
                    contentPadding = PaddingValues(16.dp),
                    horizontalArrangement = Arrangement.spacedBy(14.dp),
                    verticalArrangement = Arrangement.spacedBy(14.dp),
                    modifier = Modifier.fillMaxSize()
                ) {
                    items(state.products, key = { it.id }) { product ->
                        ProductItemCard(
                            product = product,
                            onClick = { onNavigateToDetail(product.id) }
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun ProductItemCard(
    product: Product,
    onClick: () -> Unit
) {
    SketchCard(
        modifier = Modifier.fillMaxWidth(),
        cornerRadius = 12.dp,
        shadowOffset = 4.dp,
        onClick = onClick
    ) {
        Column {
            // Artwork Box Preview
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .aspectRatio(1f)
                    .background(Color(product.hexColor)),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = product.emoji,
                    fontSize = 64.sp
                )

                if (product.bestseller) {
                    Box(
                        modifier = Modifier
                            .align(Alignment.TopStart)
                            .padding(8.dp)
                            .sketchBorderLight(strokeWidth = 1.dp, cornerRadius = 6.dp)
                            .clip(RoundedCornerShape(6.dp))
                            .background(WarmYellow)
                            .padding(horizontal = 6.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = "★ Best Seller",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = InkBlack
                        )
                    }
                }
            }

            // Info Box
            Column(modifier = Modifier.padding(10.dp)) {
                Text(
                    text = product.displayTitle,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    color = InkBlack
                )
                Text(
                    text = product.artist,
                    fontSize = 12.sp,
                    color = InkMuted,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )

                Spacer(modifier = Modifier.height(6.dp))

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = product.price.toRupiah(),
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 14.sp,
                        color = InkBlack
                    )
                    Text(
                        text = product.originalPrice.toRupiah(),
                        fontSize = 11.sp,
                        color = InkMuted,
                        textDecoration = TextDecoration.LineThrough
                    )
                }
            }
        }
    }
}
