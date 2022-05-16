import '../scss/main.scss'


async function getMovie(name, page) {
    let res = await fetch(`https://www.omdbapi.com?apikey=${key}&s=${name}&page=${page}&plot`)
    res = await res.json()
    return res
}

const form = document.querySelector('#form')
const search = document.querySelector('#search') //검색
const buttonSearch = document.querySelector('.button--search') //검색버튼
const buttonMore = document.querySelector('.button--more') //검색버튼
const poster = document.querySelector('.poster') //poster
const total = document.querySelector('.total') //totalReault 나오는 공간
const toTop = document.querySelector('.top') //상단이동
const key = '7035c60c'
let posterTitle = document.querySelector('.poster-title') //영화제목
let posteryear = document.querySelector('.poster-year') //영화년도
let posterPicture = document.querySelector('.poster-picture>img') //영화이미지
let page = 1


form.addEventListener('submit', async (e) => {
  e.preventDefault()
  let searchVal = search.value 
  console.log(searchVal)
    try {

      const movies = await getMovie(searchVal, page=1) //await
  
      console.log(movies)
      console.log(typeof movies.Search, movies.Search)
      
      const postRes = movies.Search //Search값 할당
      let mvTotalRes = movies.totalResults //movie totalResults

      poster.innerHTML = '' //초기화
      buttonMore.innerHTML = 1 //버튼누르면 값1로 초기화

      total.innerHTML = `'${searchVal}' 검색결과: '${mvTotalRes}'개가 나왔습니다`
      console.log(`검색결과: '${mvTotalRes}'개가 나왔습니다`)  

      postRes.forEach((element, index) => { //forEach문을 통해 Template을 postRes갯수만큼 생성
      console.log(element.Title,[index])
          let template = document.createElement('div')
          template.innerHTML =
          `
          <div class="poster-template">
            <div class="poster-title">${movies.Search[index].Title}</div>
            <div class="poster-year">${movies.Search[index].Year}</div>
            <div class="poster-picture"><img src=${movies.Search[index].Poster} onError="this.src='./images/404.gif';"></div>
          </div>
          `
          poster.append(template)
          
        })
      } catch(err) {
        const getInner = total.innerHTML
        console.log(getInner)
        console.log(getInner.search('undefined')) //10번째이상일경우
        const outText = getInner.search('undefined')
        if(outText >= 10) {
          console.log(outText)
          total.innerHTML = `'${searchVal}' 검색결과가 없습니다`
        }
        
      }
      
  })
  
buttonMore.addEventListener("click", async(e) =>{

  page = Number(buttonMore.textContent)
  e.preventDefault()
  page = page + 1
  buttonMore.textContent = page
  console.log(typeof page, page)

  const searchVal = search.value 
  const movies = await getMovie(searchVal, page)

  const postRes = movies.Search 
  postRes.forEach((element, index) => { //forEach문을 통해 Template을 postRes갯수만큼 생성
    console.log(element.Title,[index])
        let template = document.createElement('div')
        template.innerHTML =
        `
        <div class="poster-template">
          <div class="poster-title">${movies.Search[index].Title}</div>
          <div class="poster-year">${movies.Search[index].Year}</div>
          <div class="poster-picture"><img src=${movies.Search[index].Poster} onError="this.src='./images/404.gif';"></div>
        </div>
        `
        poster.append(template)
      })
})

//상단이동
toTop.addEventListener('click', () => {
  document.body.scrollIntoView({behavior:'smooth'})
})




