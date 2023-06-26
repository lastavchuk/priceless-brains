const organization = [
    {
        title: 'Save the Children',
        url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
        img: './images/js-project-png/STC_x1.png',
    },
    {
        title: 'Project HOPE',
        url: 'https://www.projecthope.org/country/ukraine/',
        img: './images/js-project-png/project-hope_x1.png',
    },
    {
        title: 'UNITED24',
        url: 'https://u24.gov.ua/uk',
        img: '../images/js-project-png/u24_x1.png',
    },
    {
        title: 'International Medical Corps',
        url: 'https://internationalmedicalcorps.org/country/ukraine/',
        img: '../images/js-project-png/IMC_x1.png',
    },
    {
        title: 'Medicins Sans Frontieres',
        url: 'https://www.msf.org/ukraine',
        img: '../images/js-project-png/MSF_x1.png',
    },
    {
        title: 'RAZOM',
        url: 'https://www.razomforukraine.org/',
        img: '../images/js-project-png/razom_x1.png',
    },
    {
        title: 'Action against hunger',
        url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
        img: '../images/js-project-png/AAH_x1.png',
    },
    {
        title: 'World vision',
        url: 'https://www.wvi.org/emergencies/ukraine',
        img: '../images/js-project-png/WV_x1.png',
    },
    {
        title: 'Serhiy Prytula Charity Foundation',
        url: 'https://prytulafoundation.org/en',
        img: '../images/js-project-png/segiy-prytula_x1.png',
    },
];

const elements = {
    supportList: document.querySelector('.support-list'),
    btnMore: document.querySelector('.support-btn-more'),
    btnPrev: document.querySelector('.support-btn-prev'),
};

let amount = 4;

// btnMore.addEventListener('click', handlerClickMore);
// btnPrev.addEventListener('click', handlerClickPrev);

function createSupportList(arr) {
    console.log(arr);
    return arr
        .map(({ title, url, img }, idx) => {
            return `<li class="support-item">
            <a href="${url}" target="_blank" rel="noopener noreferrer nofollow">
                ${(idx + 1)
                    .toString()
                    .padStart('2', 0)}<img src="${img}" alt="${title}" />
            </a>
        </li>`;
        })
        .join('');
}

// function createSupportList(arr) {
//     let markup = '';
//     for (let i = 1; i <= 9; i += 1) {
//         markup += `<li class="support-item"> ${i}
//             <a href="${organization.url}" target="_blank" rel="noopener noreferrer nofollow">
//                 <img src="${organization.img}" alt="${organization.title}" />
//             </a>
//         </li>`;
//     }
// }

elements.supportList.insertAdjacentHTML(
    'beforeend',
    createSupportList(organization)
);

// function handlerClickMore() {
//     if (amount < supportList.length {

//     })
// }
