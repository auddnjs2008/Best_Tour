# BEST_Tour
  자신이 기억에 남았던 장소를 저장하고 공유 할 수 있는 서비스
  

## 기술스택

프론트엔드:
   <div>
   <img src="https://img.shields.io/badge/-Next.js-000000?style=flat&logo=Next.js" />
   <img src="https://img.shields.io/badge/-TypeScript-000000?style=flat&logo=TypeScript" />
   <img src="https://img.shields.io/badge/-Redux-764ABC?style=flat&logo=Redux" />
   <img src="https://img.shields.io/badge/-SWR-000000?style=flat" />
   </div>
   
백엔드(서버리스):
    <div>
   <img src="https://img.shields.io/badge/-PlanetScale-000000?style=flat&logo=PlanetScale" />
   <img src="https://img.shields.io/badge/-Prisma-000000?style=flat&logo=Prisma" />
   <img src="https://img.shields.io/badge/-Cloudflare-000000?style=flat&logo=Cloudflare" />
   </div>
   
  
## 기능
  #### 1. HomePage 
     
     1-1  첫화면에 카카오 지도와 지도 위에 자신이 저장해 두었던 마커들을 확인 할 수 있습니다. 필터를 활용해 색깔별 파일별로 보고싶은 마커만 띄울 수 있습니다.
     
     1-2  마커를 클릭시 focus가 되며 장소정보 창이 뜨게 됩니다. 로드뷰 기능과  카카오톡 공유기능  그리고 즐겨찾기 기능을 사용하실 수 있습니다.
     
     1-3  검색창을 활용을 해 장소를 찾을 수 있습니다.
  
  #### 2. PlaceBoard Page
  
     2-1  모든 사용자가 등록한 글을 확인 할 수 있습니다.  등록한 글 내에서는 댓글을 달 수 있으며 유저가 추천한 장소가 카카오 지도에 등록되어 있으면 이동이 가능합니다.
     
     2-2  직접 글을 쓸 수 있으며 사진을 최대 4장 저장을 할 수 있습니다. 여기서 주소는 카카오 데이터를 이용해 검증을 하므로 정확한 주소가 필요합니다. 
     
     2-3  내가 쓴 글들은 삭제를 할 수 있습니다. 
  
  #### 3. MyPage 
     
     3-1 내가 쓴 포스트의 개수와 저장한 마커의 개수를 확인할 수 있습니다.
     
     3-2 나의 프로필을 수정 할 수 있습니다.  프로필 사진 이름 , 이메일을 수정 할 수 있습니다. 
  
  <div>
   <img src="https://user-images.githubusercontent.com/46766443/173216703-5d2af7f0-093d-4495-ae50-7859e31f1950.png" width="300" height="400" />
   <img src="https://user-images.githubusercontent.com/46766443/173216845-9acec8a3-7ef7-4b6f-a58e-703f209ca1dd.png"  width="300" height="400" />
   <img src="https://user-images.githubusercontent.com/46766443/173216864-259d47c9-4588-48e6-88c9-08a3fc036c0d.png"  width="300" height="400" />
   <img src="https://user-images.githubusercontent.com/46766443/173216880-73da0d1e-befe-43c3-82f8-e025e05960c8.png"   width="300" height="400"/>
   <img src="https://user-images.githubusercontent.com/46766443/173216904-5f8cfa33-78d5-4d80-8df1-0b341ba1a35b.png"   width="300" height="400"/>
   <img src="https://user-images.githubusercontent.com/46766443/173216945-3cfd4884-9a69-47d1-9e58-6223e5fd361b.png"   width="300" height="400"/>  
  </div>

## 기술

  
  1. useSWR을 사용을 해 캐시를 활용하여 api 데이터들을 관리를 해주고 redux를 사용을 해 로컬의 전역상태를 관리를 하였습니다. 
  
  2. 페이지별 렌더링 방식
  
  
    /   :   SSR 방식을 활용을 하였습니다.  CSR로 불러올 경우 마커들의 데이터를 찾아올 동안 지도에 아무 화면도 안 나오는게 싫어  SSR 방식을 채택을 하였습니다. 
             단 로그인 페이지에서 로그인이 성공하면 / 페이지로 이동을 하는데 약간의 시간이 걸립니다. 아마  SSR 방식을 쓰기 때문에 이런 현상이 일어나는 거 같은데 추후 수정 필요              합니다.
             
    /PlaceBoard: ISR 방식을 활용을 하였습니다. Incremental Static Re-Generation 방식으로 static generation 방식은 언제나 빌드 시점 에 페이지를 생성하지만, ISR 방식은 일정                    주기마다 데이터의 최신 여부를 검사하고 업데이트된 데이터로 페이지를 다시 생성합니다. 일단 이 페이지에서는 모든 유저의 글을 가져오기 때문에  정적페이지로 만드는
                 게 용이하였고 revalidate 속성을 활용해 업데이트를 할 수 있으므로 적합하다 판단하여 적용을 하였습니다.
                 
    /MyPage : CSR 방식을 활용을 하였습니다. 먼저 User 데이터를 SSR 방식으로 적용시킬 필요가 없다 생각하여 적용을 하였습니다.
    
    
  3. _middleware.tsx 파일을 활용을 해  유저 브라우저에 해당 쿠키가 저장이 되어 있지 않으면 로그인 페이지로 redirect 시키게 하였습니다.

   ![image](https://user-images.githubusercontent.com/46766443/173217259-91d08829-86c5-49c8-8290-42948875481d.png)

 
 ## url
 
 https://best-tour-jhtn26lzs-auddnjs2008.vercel.app/myProfile
     



