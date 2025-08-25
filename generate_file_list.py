import os
import json

def generate_file_list():
    """Quét thư mục data/audio và tạo ra file file_list.json với thông tin về file nhạc và ảnh đại diện."""
    audio_dir = os.path.join('data', 'audio')
    tracks = []
    supported_audio_extensions = ['.mp3', '.wav', '.m4a', '.ogg']
    supported_image_extensions = ['.jpg', '.jpeg', '.png', '.gif']

    if not os.path.exists(audio_dir):
        print(f"Thư mục {audio_dir} không tồn tại. Đang tạo mới...")
        os.makedirs(audio_dir)
        with open(os.path.join(audio_dir, 'dat_file_am_thanh_cua_ban_vao_day.txt'), 'w') as f:
            f.write("Xóa file này đi và sao chép nhạc của bạn vào đây.")

    for filename in sorted(os.listdir(audio_dir)):
        file_basename, file_ext = os.path.splitext(filename)
        if file_ext.lower() in supported_audio_extensions:
            track_info = {
                'filename': filename,
                'artwork': None
            }
            # Tìm ảnh đại diện có cùng tên
            for img_ext in supported_image_extensions:
                artwork_path = os.path.join(audio_dir, f"{file_basename}{img_ext}")
                if os.path.exists(artwork_path):
                    track_info['artwork'] = f"{file_basename}{img_ext}"
                    break
            tracks.append(track_info)

    with open('file_list.json', 'w', encoding='utf-8') as f:
        json.dump(tracks, f, ensure_ascii=False, indent=4)
    
    print(f"Đã tạo file_list.json thành công với {len(tracks)} file âm thanh.")

if __name__ == '__main__':
    generate_file_list()
