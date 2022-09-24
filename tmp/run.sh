 for i in {0..14} ; do
curl 'https://www.uvsultra.online/listing_cards.php' \
  -H 'authority: www.uvsultra.online' \
  -H 'accept: */*' \
  -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
  -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' \
  -H 'cookie: PHPSESSID=d5896d84cf1ae5d2684e57ddde3f08b5' \
  -H 'dnt: 1' \
  -H 'origin: https://www.uvsultra.online' \
  -H 'referer: https://www.uvsultra.online/index.php' \
  -H 'sec-ch-ua: "Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36' \
  -H 'x-requested-with: XMLHttpRequest' \
  --data-raw 'name=&card_text=&extension%5B%5D=102&extension%5B%5D=103&extension%5B%5D=101&extension%5B%5D=99&extension%5B%5D=98&extension%5B%5D=97&difficulty_operand=%3D&difficulty=&bm_operand=%3D&block=&as_operand=%3D&speed=&ad_operand=%3D&damage=&v_operand=%3D&vitality=&keyword_text=&page=0' \
  --compressed > $i.html
done
