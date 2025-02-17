import os
import requests
import time
import urllib.parse

# 确保音频目录存在
audio_dir = "assets/audio"
if not os.path.exists(audio_dir):
    os.makedirs(audio_dir)

# 法语单词列表
words = [
    {"name": "bonjour", "text": "bonjour"},
    {"name": "merci", "text": "merci"},
    {"name": "au_revoir", "text": "au revoir"},
    {"name": "sil_vous_plait", "text": "s'il vous plaît"},
    {"name": "je_taime", "text": "je t'aime"},
    {"name": "comment_allez_vous", "text": "comment allez-vous"},
    {"name": "oui", "text": "oui"},
    {"name": "non", "text": "non"},
    {"name": "excusez_moi", "text": "excusez-moi"},
    {"name": "bonne_nuit", "text": "bonne nuit"}
]

def download_audio(word):
    try:
        # 构建 Google Translate TTS URL
        encoded_text = urllib.parse.quote(word["text"])
        url = f"https://translate.google.com/translate_tts?ie=UTF-8&q={encoded_text}&tl=fr&client=tw-ob"
        
        # 设置请求头
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://translate.google.com/',
            'Accept': '*/*'
        }
        
        # 发送请求下载音频
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            # 保存音频文件
            file_path = os.path.join(audio_dir, f"{word['name']}.mp3")
            with open(file_path, 'wb') as f:
                f.write(response.content)
            print(f"成功下载: {word['name']}.mp3")
            return True
        else:
            print(f"下载失败: {word['name']}, 状态码: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"下载出错: {word['name']}, 错误: {str(e)}")
        return False

def main():
    print("开始下载音频文件...")
    success_count = 0
    
    for word in words:
        if download_audio(word):
            success_count += 1
        # 添加延时，避免请求过快
        time.sleep(2)
    
    print(f"\n下载完成! 成功: {success_count}/{len(words)}")

if __name__ == "__main__":
    main() 