$src = "C:\Users\HP\.gemini\antigravity\brain\754e390d-df7c-482b-8a46-661eec759dc8"
$dst = "C:\Users\HP\Documents\dropzone\images"

Get-ChildItem -Path $src -Filter "hero_banner_*.png" | Copy-Item -Destination "$dst\hero.png" -Force
Get-ChildItem -Path $src -Filter "product_headphones_*.png" | Copy-Item -Destination "$dst\headphones.png" -Force
Get-ChildItem -Path $src -Filter "product_keyboard_*.png" | Copy-Item -Destination "$dst\keyboard.png" -Force
Get-ChildItem -Path $src -Filter "product_webcam_*.png" | Copy-Item -Destination "$dst\webcam.png" -Force
Get-ChildItem -Path $src -Filter "product_ssd_*.png" | Copy-Item -Destination "$dst\ssd.png" -Force
Get-ChildItem -Path $src -Filter "product_smartwatch_*.png" | Copy-Item -Destination "$dst\smartwatch.png" -Force
Get-ChildItem -Path $src -Filter "product_charger_*.png" | Copy-Item -Destination "$dst\charger.png" -Force
Get-ChildItem -Path $src -Filter "product_hoodie_*.png" | Copy-Item -Destination "$dst\hoodie.png" -Force
Get-ChildItem -Path $src -Filter "product_cargo_pants_*.png" | Copy-Item -Destination "$dst\cargo_pants.png" -Force
Get-ChildItem -Path $src -Filter "product_puffer_jacket_*.png" | Copy-Item -Destination "$dst\puffer_jacket.png" -Force
Get-ChildItem -Path $src -Filter "product_graphic_tees_*.png" | Copy-Item -Destination "$dst\graphic_tees.png" -Force
Get-ChildItem -Path $src -Filter "product_beanie_*.png" | Copy-Item -Destination "$dst\beanie.png" -Force
Get-ChildItem -Path $src -Filter "product_crossbody_bag_*.png" | Copy-Item -Destination "$dst\crossbody_bag.png" -Force
Get-ChildItem -Path $src -Filter "product_foam_slides_*.png" | Copy-Item -Destination "$dst\foam_slides.png" -Force
Get-ChildItem -Path $src -Filter "product_high_tops_*.png" | Copy-Item -Destination "$dst\high_tops.png" -Force
Get-ChildItem -Path $src -Filter "product_trail_runner_*.png" | Copy-Item -Destination "$dst\trail_runner.png" -Force
Get-ChildItem -Path $src -Filter "product_chunky_shoe_*.png" | Copy-Item -Destination "$dst\chunky_shoe.png" -Force

Copy-Item "$dst\foam_slides.png" "$dst\slip_on.png" -Force
Copy-Item "$dst\high_tops.png" "$dst\collab_drop.png" -Force
Copy-Item "$dst\charger.png" "$dst\gaming_mouse.png" -Force
Copy-Item "$dst\headphones.png" "$dst\gaming_headset.png" -Force
Copy-Item "$dst\chunky_shoe.png" "$dst\gaming_chair.png" -Force
Copy-Item "$dst\keyboard.png" "$dst\controller.png" -Force
Copy-Item "$dst\webcam.png" "$dst\capture_card.png" -Force
Copy-Item "$dst\ssd.png" "$dst\desk_mat.png" -Force
