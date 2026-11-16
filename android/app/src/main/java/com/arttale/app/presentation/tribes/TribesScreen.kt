package com.arttale.app.presentation.tribes

import androidx.compose.foundation.background
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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.arttale.app.core.theme.CreativeViolet
import com.arttale.app.core.theme.InkBlack
import com.arttale.app.core.theme.InkMuted
import com.arttale.app.core.theme.PaperBackground
import com.arttale.app.core.theme.WarmYellow
import com.arttale.app.core.theme.sketchBorderLight
import com.arttale.app.domain.model.Tribe
import com.arttale.app.presentation.cart.CartViewModel
import com.arttale.app.presentation.catalog.CatalogViewModel
import com.arttale.app.presentation.components.BottomNavBar
import com.arttale.app.presentation.components.SketchCard
import com.arttale.app.presentation.navigation.Screen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TribesScreen(
    onNavigateBottom: (Screen) -> Unit,
    cartViewModel: CartViewModel = hiltViewModel(),
    catalogViewModel: CatalogViewModel = hiltViewModel()
) {
    val cartState by cartViewModel.uiState.collectAsState()

    val tribes = listOf(
        Tribe("anime-lokal", "Anime Lokal", "🎴", "12.4k", 1240, "+18%", "Karya bertema anime, manga, & pop kultur Jepang sentuhan lokal.", 0xFFFCE7F3),
        Tribe("gamer-merch", "Gamer Merch", "🎮", "9.1k", 890, "+12%", "Merch untuk para gamer—dari MOBA, RPG, hingga retro pixel art.", 0xFFEDE9FE),
        Tribe("indie-music", "Indie Music", "🎵", "5.8k", 640, "+24%", "Tribute scene musik indie, poster gigs, dan album art lokal.", 0xFFFEF3C7),
        Tribe("skena-kopi", "Skena Kopi", "☕", "3.2k", 420, "+8%", "Karya untuk barista, penikmat kopi, dan budaya kafe santai.", 0xFFF5F5F4),
        Tribe("pecinta-alam", "Pecinta Alam", "🏕️", "6.7k", 780, "+15%", "Karya outdoor, pendaki gunung, camping, dan keindahan alam.", 0xFFD1FAE5),
        Tribe("receh-republic", "Receh Republic", "😂", "21.3k", 1820, "+32%", "Meme, parodi, plesetan humor receh kelas berat penghilang stres.", 0xFFFEF9C3)
    )

    Scaffold(
        containerColor = PaperBackground,
        topBar = {
            TopAppBar(
                title = { Text("Trending Tribes", fontWeight = FontWeight.Bold, fontSize = 20.sp) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = PaperBackground)
            )
        },
        bottomBar = {
            BottomNavBar(
                currentRoute = Screen.Tribes.route,
                cartCount = cartState.totalQuantity,
                onNavigate = onNavigateBottom
            )
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                Text(
                    text = "Hub Komunitas & Fandom Kreator",
                    fontSize = 13.sp,
                    color = InkMuted
                )
                Spacer(modifier = Modifier.height(4.dp))
            }

            items(tribes, key = { it.slug }) { tribe ->
                SketchCard(
                    modifier = Modifier.fillMaxWidth(),
                    backgroundColor = Color(tribe.bgColorHex),
                    cornerRadius = 14.dp,
                    shadowOffset = 4.dp
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(text = tribe.emoji, fontSize = 28.sp)
                                Spacer(modifier = Modifier.width(10.dp))
                                Column {
                                    Text(
                                        text = tribe.name,
                                        fontWeight = FontWeight.ExtraBold,
                                        fontSize = 17.sp,
                                        color = InkBlack
                                    )
                                    Text(
                                        text = "${tribe.memberCount} anggota · ${tribe.productCount} karya",
                                        fontSize = 12.sp,
                                        color = InkBlack.copy(alpha = 0.7f)
                                    )
                                }
                            }

                            Box(
                                modifier = Modifier
                                    .sketchBorderLight(cornerRadius = 6.dp)
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(WarmYellow)
                                    .padding(horizontal = 8.dp, vertical = 2.dp)
                            ) {
                                Text(
                                    text = tribe.growthRate,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = InkBlack
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = tribe.description,
                            fontSize = 13.sp,
                            color = InkBlack.copy(alpha = 0.8f),
                            lineHeight = 18.sp
                        )
                    }
                }
            }
        }
    }
}
