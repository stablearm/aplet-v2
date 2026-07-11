$files = @('telegram-admin.mdx','telegram-ads-pricing.mdx','telegram-channel-admin.mdx','telegram-channels-for-business.mdx','telegram-channels-for-business-2.mdx','telegram-channels-for-business-3.mdx','telegram-channels-monetization.mdx','telegram-channels-vs-groups.mdx','telegram-content-bot.mdx','telegram-cpc.mdx')
foreach ($f in $files) {
  $path = "D:\Dev\Apletv2\V2\src\content\glossary\$f"
  $content = Get-Content $path -Raw
  $words = ($content -split '\s+').Count
  Write-Host "$f : $words words"
}
