

# Github Actions + AWS S3 자동 배포하기
프론트, 백엔드 상관없이 개발자로 일하면서 배포는 당연히 알아야 했고, 그 동안 나는 누군가가 해주는 일이었기 때문에
쉽게 넘어갔었다. 문득 생각이 들었다. 나는 물 경력이 되기 싫었고 경력이 중요한 것이 아니라 얼마나 자기 일에 관심이 있느냐에 차이인거를
배포는 선택이 아니라 필수다. React, Vue 문법이 다르듯 배포 관련된 용어도 열심히 공부하면 된다. 뭐든 해봐야지!! 후... 

TMI 나는 커밋 45번째에 성공을 했고, 정말 열받으면서 수십 번 속으로
욕하면서 때려칠까?? 그냥 직장 동료한테 물어볼까? 라는 생각을 백 번은 한거 같다. 그래도 직접 몸으로 느껴야 머릿 속에 남으니 포기하지 않고 꾸역 꾸역 끝에 해결했다.ㅜㅜ 


이 글은 **처음 CI/CD를 접하는 신입 개발자**의 입장에서 충분히 이해가 쉽도록 작성한 글이다.


## CI/CD가 뭐냐? 채용공고에 우대 사항으로 자주 나오는 단어

- **CI (Continuous Integration)**: 지속적인 통합
  > 코드를 자주 병합하고 자동으로 빌드/테스트를 진행한다.  
  그래서 이 말이 뭔데? 그냥 자주 커밋하고 수정하고 푸쉬하고 병합하고 빌드하는 걸 의미한다. 

 `(조용히 깊게 생각하지말고 이해하려하지마라)`

- **CD (Continuous Deployment)**: 지속적인 배포  
  > 코드가 병합되면 자동으로 배포까지 이어지는 과정 

자 여기서 CI/CD를 모르면 그냥 개고생 하듯. npm run build 해서 dist 폴더가 생기면 안에 파일들을 드래그앤 드랍으로  FTP에 올리던지 어쩌구 저쩌구 하는데 이런 귀찮은 과정을 알아서 해주는 걸 CI/CD라고 생각하면된다. 


## GitHub Actions란? ㅅㅂ
> GitHub 저장소에서 제공하는 워크플로 자동화 도구  
특정 이벤트 `(push, pull request)`가 발생했을 때 정해둔 순서대로 스크립트를 실행해준다. (개 편함)


GitHub Actions를 쓰려면 우선 프로젝트 루트 폴더에 `.github/workflows/` 폴더에 `.yml` 파일을 만들어야 한다.
YAML 문법은 처음 보면 외계어다. 그냥 계속 보고 공부하자



### `파일 위치`

```md
project-mwkang
├──.github
│  ├── workflows
│  │  ├── deploy.yml 

```


## GitHub Actions 설정 예시
```yml
on:                             # 언제 실행할지 (Trigger 조건)
  push:                         # 깃헙에 push 할 때 실행됨.
    branches:                   # main 브랜치에 push가 일어났을 때만 실행됨.
      - main                    # 즉: main 브랜치에 코드가 올라가면 이 워크플로 전체가 동작함!      

jobs:
  build:  # 'build'라는 이름의 작업(Job)을 정의
    runs-on: ubuntu-latest  # 최신 Ubuntu 환경에서 실행됨

    steps:  # 아래는 이 작업 안에서 실행될 단계들
      - name: Checkout
        uses: actions/checkout@v4
        # 현재 GitHub 저장소의 코드를 이 Runner(가상 서버)로 다운로드함

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20        # Node.js 20버전을 사용
          cache: npm              # 의존성 설치 속도를 위한 npm 캐시 사용

      - name: Install dependencies
        run: npm ci
        # package-lock.json 기준으로 의존성 빠르게 설치 (npm install보다 더 깔끔하고 빠름)

      - name: Build with VitePress
        run: npm run docs:build
        # VitePress로 정적 파일을 빌드 (.vitepress/dist 디렉토리에 생성됨)

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-2
        # GitHub 저장소에 등록된 AWS 비밀 키(Secrets)를 불러와서 AWS CLI 인증을 설정
        # 한국(서울) 리전 사용

      - name: Deploy to S3
        run: |
          aws s3 sync .vitepress/dist/ s3://stonemwkang/ --delete --no-progress
        # 빌드된 정적 파일(.vitepress/dist)을 S3 버킷(stonemwkang)에 업로드
        # --delete: S3에 있는 이전 파일 중 더 이상 로컬에 없는 파일은 삭제
        # --no-progress: 출력 간결화 (로그 깨짐 방지용)

```


## GitHub Secrets 설정
GitHub → 저장소 → Settings → Secrets and variables → Actions → New repository secret 아래 키를 설정한다.

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY


## 작동 흐름

1. main 브랜치에 push

2. GitHub Actions가 빌드 실행

3. 빌드 결과물을 AWS S3에 업로드

4. S3에 정적 웹사이트가 갱신됨


## 삽질기록 (중간에 헤맨 부분)

* .yml 문법이 이상하면 아무 에러도 없이 그냥 멈춰있음 

* SOURCE_DIR 경로 잘못 넣어서 빌드 결과가 없다고 나옴

* S3 퍼블릭 권한 안 줘서 "Access Denied" 에러 발생

* 빌드과정에서 경로 잘못써서 개 삽질함..



## 다음 시간엔 AWS S3를 알아보자!!!
