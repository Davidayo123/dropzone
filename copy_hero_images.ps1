$src = "C:\Users\HP\.gemini\antigravity\brain\754e390d-df7c-482b-8a46-661eec759dc8"
$dst = "C:\Users\HP\Documents\dropzone\images"

Get-ChildItem -Path $src -Filter "hero_slide_1_*.png" | Copy-Item -Destination "$dst\hero_1.png" -Force
Get-ChildItem -Path $src -Filter "hero_slide_2_*.png" | Copy-Item -Destination "$dst\hero_2.png" -Force
Get-ChildItem -Path $src -Filter "hero_slide_3_*.png" | Copy-Item -Destination "$dst\hero_3.png" -Force
Get-ChildItem -Path $src -Filter "hero_slide_4_*.png" | Copy-Item -Destination "$dst\hero_4.png" -Force
Get-ChildItem -Path $src -Filter "hero_slide_5_*.png" | Copy-Item -Destination "$dst\hero_5.png" -Force
