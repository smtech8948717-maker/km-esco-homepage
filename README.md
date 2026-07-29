# 경민설비건설(주) × 에스엠테크 홈페이지

GitHub Pages에 바로 올릴 수 있도록 정리한 배포용 파일입니다.

## 가장 쉬운 게시 방법

1. GitHub에 로그인합니다.
2. 오른쪽 위 `+` → `New repository`를 선택합니다.
3. 저장소 이름을 예: `km-esco-homepage`로 입력합니다.
4. 저장소는 `Public`으로 생성합니다.
5. `Add file` → `Upload files`를 누릅니다.
6. 이 폴더 안의 다음 파일을 업로드합니다.
   - `index.html`
   - `.nojekyll`
   - `404.html`
7. 저장소의 `Settings` → `Pages`로 이동합니다.
8. `Build and deployment`에서:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
   를 선택하고 저장합니다.
9. 약 1~5분 후 아래 형식의 무료 주소가 생성됩니다.

`https://사용자이름.github.io/km-esco-homepage/`

## 수정 방법

홈페이지를 수정한 뒤 `index.html`만 다시 업로드해서 기존 파일을 교체하면 됩니다.
주소는 바뀌지 않습니다.

## 참고

현재 HTML은 이미지와 대부분의 리소스가 파일 안에 포함된 단일 HTML 방식이라,
별도의 images 폴더 없이도 바로 게시할 수 있습니다.
