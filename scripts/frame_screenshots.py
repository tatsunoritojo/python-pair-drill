"""スクリーンショットにスマホ風デバイスフレームを焼き込むツール。

GitHub の README は CSS を無視するため、角丸・ベゼル・影は画像に焼き込む必要がある。
透過PNG で出力するのでライト/ダーク両テーマで綺麗に出る。

入力:  docs/screenshots/raw/*.png （撮影したままの素のスクショ）
出力:  docs/screenshots/*.png      （フレーム済み・README から参照される正本）

使い方: python scripts/frame_screenshots.py
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "screenshots" / "raw"
OUT = ROOT / "docs" / "screenshots"

# 端末フレームで囲むギャラリー画像（414x900 のスマホ画面）
PHONE_SHOTS = [
    "01-drill-home.png",
    "02-drill-feedback.png",
    "03-result.png",
    "04-logic-trace.png",
    "05-ai-assistant.png",
]
# パネル詳細はスマホ画面ではないので、角丸＋影のカード扱い
CARD_SHOTS = ["06-scoring-engine.png"]

BODY_COLOR = (18, 19, 24, 255)
SHADOW_COLOR = (15, 23, 42)  # 影の色（濃紺寄りのグレー）


def rounded_mask(size, radius):
    """指定サイズ・角丸半径の L マスク（角丸内 255）。"""
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return mask


def add_shadow(canvas, shape_mask, pos, blur, offset, alpha):
    """canvas（RGBA）に shape_mask の形のソフトシャドウを描く。"""
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow = Image.new("RGBA", shape_mask.size, (*SHADOW_COLOR, alpha))
    shadow.putalpha(shape_mask.point(lambda v: int(v * alpha / 255)))
    layer.paste(shadow, (pos[0] + offset[0], pos[1] + offset[1]), shadow)
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    return Image.alpha_composite(canvas, layer)


def make_phone(src_path, out_path):
    screen = Image.open(src_path).convert("RGBA")
    w, h = screen.size

    bz_x, bz_top, bz_bot = 14, 28, 28
    screen_radius, body_radius = 38, 54
    margin, sh_blur, sh_dy, sh_alpha = 44, 26, 18, 105

    body_w, body_h = w + bz_x * 2, h + bz_top + bz_bot

    # 画面の角丸
    screen.putalpha(rounded_mask((w, h), screen_radius))

    # 端末ボディ
    body = Image.new("RGBA", (body_w, body_h), (0, 0, 0, 0))
    ImageDraw.Draw(body).rounded_rectangle(
        [0, 0, body_w - 1, body_h - 1], radius=body_radius, fill=BODY_COLOR
    )
    body.paste(screen, (bz_x, bz_top), screen)

    d = ImageDraw.Draw(body)
    # 上部スピーカー（ピル）
    pill_w, pill_h = 88, 7
    px = (body_w - pill_w) // 2
    py = (bz_top - pill_h) // 2
    d.rounded_rectangle([px, py, px + pill_w, py + pill_h], radius=pill_h // 2, fill=(48, 50, 58))
    # 下部ホームインジケータ
    hi_w, hi_h = 122, 5
    hx = (body_w - hi_w) // 2
    hy = body_h - bz_bot // 2 - hi_h // 2
    d.rounded_rectangle([hx, hy, hx + hi_w, hy + hi_h], radius=hi_h // 2, fill=(78, 80, 90))

    # 影付きキャンバスに合成
    canvas = Image.new("RGBA", (body_w + margin * 2, body_h + margin * 2), (0, 0, 0, 0))
    body_mask = rounded_mask((body_w, body_h), body_radius)
    canvas = add_shadow(canvas, body_mask, (margin, margin), sh_blur, (0, sh_dy), sh_alpha)
    canvas.paste(body, (margin, margin), body)

    canvas.save(out_path)
    return canvas.size


def make_card(src_path, out_path):
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    radius, margin, sh_blur, sh_dy, sh_alpha = 22, 36, 22, 14, 90

    img.putalpha(rounded_mask((w, h), radius))

    canvas = Image.new("RGBA", (w + margin * 2, h + margin * 2), (0, 0, 0, 0))
    card_mask = rounded_mask((w, h), radius)
    canvas = add_shadow(canvas, card_mask, (margin, margin), sh_blur, (0, sh_dy), sh_alpha)
    canvas.paste(img, (margin, margin), img)

    canvas.save(out_path)
    return canvas.size


def main():
    for name in PHONE_SHOTS:
        size = make_phone(SRC / name, OUT / name)
        print(f"[phone] {name} -> {size[0]}x{size[1]}")
    for name in CARD_SHOTS:
        size = make_card(SRC / name, OUT / name)
        print(f"[card]  {name} -> {size[0]}x{size[1]}")


if __name__ == "__main__":
    main()
