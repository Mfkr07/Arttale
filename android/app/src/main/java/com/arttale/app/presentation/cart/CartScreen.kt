package com.arttale.app.presentation.cart

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material.icons.filled.ShoppingBag
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.arttale.app.core.common.toRupiah
import com.arttale.app.core.theme.CreativeViolet
import com.arttale.app.core.theme.CreativeVioletSoft
import com.arttale.app.core.theme.InkBlack
import com.arttale.app.core.theme.InkMuted
import com.arttale.app.core.theme.PaperBackground
import com.arttale.app.core.theme.PaperCard
import com.arttale.app.core.theme.SoftPink
import com.arttale.app.core.theme.WarmYellow
import com.arttale.app.core.theme.sketchBorderLight
import com.arttale.app.domain.model.CartItem
import com.arttale.app.presentation.components.BottomNavBar
import com.arttale.app.presentation.components.SketchButton
import com.arttale.app.presentation.components.SketchCard
import com.arttale.app.presentation.navigation.Screen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CartScreen(
    onNavigateToCheckout: () -> Unit,
    onNavigateToCatalog: () -> Unit,
    onNavigateBottom: (Screen) -> Unit,
    viewModel: CartViewModel = hiltViewModel()
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()

    Scaffold(
        containerColor = PaperBackground,
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Keranjang (${state.totalQuantity})",
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp
                    )
                },
                actions = {
                    if (state.items.isNotEmpty()) {
                        IconButton(onClick = viewModel::onClearCart) {
                            Icon(imageVector = Icons.Default.Delete, contentDescription = "Kosongkan", tint = SoftPink)
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = PaperBackground)
            )
        },
        bottomBar = {
            Column {
                if (state.items.isNotEmpty()) {
                    Surface(
                        modifier = Modifier.fillMaxWidth(),
                        color = PaperCard,
                        shadowElevation = 8.dp
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(text = "Subtotal Produk", fontSize = 13.sp, color = InkMuted)
                                Text(text = state.subtotal.toRupiah(), fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                            }
                            if (state.totalTip > 0) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(text = "Tip Seniman (100%)", fontSize = 13.sp, color = CreativeViolet)
                                    Text(text = "+ ${state.totalTip.toRupiah()}", fontSize = 13.sp, color = CreativeViolet, fontWeight = FontWeight.Bold)
                                }
                            }
                            Spacer(modifier = Modifier.height(6.dp))
                            Divider(color = PaperBackground, thickness = 1.5.dp)
                            Spacer(modifier = Modifier.height(8.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(text = "Total Pembayaran", fontSize = 11.sp, color = InkMuted)
                                    Text(
                                        text = state.total.toRupiah(),
                                        fontWeight = FontWeight.Black,
                                        fontSize = 18.sp,
                                        color = InkBlack
                                    )
                                }
                                SketchButton(
                                    text = "Checkout →",
                                    onClick = onNavigateToCheckout,
                                    backgroundColor = InkBlack
                                )
                            }
                        }
                    }
                }

                BottomNavBar(
                    currentRoute = Screen.Cart.route,
                    cartCount = state.totalQuantity,
                    onNavigate = onNavigateBottom
                )
            }
        }
    ) { innerPadding ->
        if (state.items.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(text = "🛒", fontSize = 64.sp)
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = "Keranjangmu masih kosong",
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp,
                        color = InkBlack
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Yuk jelajahi ribuan karya seni orisinal dari seniman lokal!",
                        fontSize = 13.sp,
                        color = InkMuted,
                        textAlign = androidx.compose.ui.text.style.TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    SketchButton(
                        text = "Lihat Katalog",
                        onClick = onNavigateToCatalog,
                        backgroundColor = CreativeViolet
                    )
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(state.items, key = { it.id }) { item ->
                    CartItemCard(
                        item = item,
                        onQtyChange = { delta -> viewModel.onQuantityChange(item.id, item.quantity + delta) },
                        onRemove = { viewModel.onRemoveItem(item.id) }
                    )
                }
            }
        }
    }
}

@Composable
fun CartItemCard(
    item: CartItem,
    onQtyChange: (Int) -> Unit,
    onRemove: () -> Unit
) {
    SketchCard(
        modifier = Modifier.fillMaxWidth(),
        cornerRadius = 12.dp,
        shadowOffset = 3.dp
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Emoji Artwork Thumbnail
            Box(
                modifier = Modifier
                    .size(64.dp)
                    .sketchBorderLight(cornerRadius = 10.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(CreativeVioletSoft),
                contentAlignment = Alignment.Center
            ) {
                Text(text = item.emoji, fontSize = 32.sp)
            }

            Spacer(modifier = Modifier.width(12.dp))

            // Details
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = item.title,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp,
                    color = InkBlack
                )
                Text(
                    text = "${item.color} · ${item.size} · ${item.quality}",
                    fontSize = 11.sp,
                    color = InkMuted
                )
                if (item.tip > 0) {
                    Text(
                        text = "+ Tip Seniman: ${item.tip.toRupiah()}",
                        fontSize = 11.sp,
                        color = CreativeViolet,
                        fontWeight = FontWeight.Medium
                    )
                }
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = item.totalPerItem.toRupiah(),
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 14.sp,
                    color = InkBlack
                )
            }

            // Qty Stepper
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(30.dp)
                        .sketchBorderLight(cornerRadius = 6.dp)
                        .clip(RoundedCornerShape(6.dp))
                        .background(PaperBackground)
                        .clickable { onQtyChange(-1) },
                    contentAlignment = Alignment.Center
                ) {
                    Icon(imageVector = Icons.Default.Remove, contentDescription = "Kurang", modifier = Modifier.size(16.dp))
                }

                Text(text = item.quantity.toString(), fontWeight = FontWeight.Bold, fontSize = 14.sp)

                Box(
                    modifier = Modifier
                        .size(30.dp)
                        .sketchBorderLight(cornerRadius = 6.dp)
                        .clip(RoundedCornerShape(6.dp))
                        .background(PaperBackground)
                        .clickable { onQtyChange(1) },
                    contentAlignment = Alignment.Center
                ) {
                    Icon(imageVector = Icons.Default.Add, contentDescription = "Tambah", modifier = Modifier.size(16.dp))
                }
            }
        }
    }
}
