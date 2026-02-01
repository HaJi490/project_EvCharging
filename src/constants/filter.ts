interface StringType {
    value: string
}

interface NumberType {
    value: number
}

export const TAB_MENU: StringType[] = [
    {value: "속성"},
    {value: '탐색반경'},
    {value: '충전속도'},
    {value: '커넥터'},
    {value: '운영기관'},
] 

export const CHARGING_COMPANY: StringType[] =[
    {value: "채비"}, {value: "레드이엔지"},
    {value: "스타코프"}, {value: "씨어스"},
    {value: "에버온"}, {value: "이지차저"},
    {value: "이카플러그"}, {value: "제주전기자동차서비스"},
    {value: "GS차지비"}, {value: "차지인"},
    {value: "클린일렉스"}, {value: "타디스테크놀로지"},
    {value: "파워큐브"}, {value: "플러그링크"},
    {value: "한국전력"}, {value: "환경부"},
    {value: "휴맥스이브이"}, {value: "기타"}
]

export const RANGE: NumberType[] = [
    {value: 2000}, {value: 3000},
    {value: 5000}, {value: 10000},
    {value: 30000}, {value: 0} //전국
]