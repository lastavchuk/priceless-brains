import stc from '../images/js-project-png/STC_x1.png';
import stc2 from '../images/js-project-png/STC_x2.png';
import hoppe from '../images/js-project-png/project-hope_x1.png';
import united from '../images/js-project-png/u24_x1.png';
import international from '../images/js-project-png/IMC_x1.png';
import medicins from '../images/js-project-png/MSF_x1.png';
import razom from '../images/js-project-png/razom_x1.png';
import action from '../images/js-project-png/AAH_x1.png';
import worldVision from '../images/js-project-png/WV_x1.png';
import serhiyPrytula from '../images/js-project-png/segiy-prytula_x1.png';

const organization = [
    {
        title: 'Save the Children',
        url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
        img: stc,
        img2: stc2,
    },
    {
        title: 'Project HOPE',
        url: 'https://www.projecthope.org/country/ukraine/',
        img: hoppe,
        img2: stc2,
    },
    {
        title: 'UNITED24',
        url: 'https://u24.gov.ua/uk',
        img: united,
        img2: stc2,
    },
    {
        title: 'International Medical Corps',
        url: 'https://internationalmedicalcorps.org/country/ukraine/',
        img: international,
        img2: stc2,
    },
    {
        title: 'Medicins Sans Frontieres',
        url: 'https://www.msf.org/ukraine',
        img: medicins,
        img2: stc2,
    },
    {
        title: 'RAZOM',
        url: 'https://www.razomforukraine.org/',
        img: razom,
        img2: stc2,
    },
    {
        title: 'Action against hunger',
        url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
        img: action,
        img2: stc2,
    },
    {
        title: 'World vision',
        url: 'https://www.wvi.org/emergencies/ukraine',
        img: worldVision,
        img2: stc2,
    },
    {
        title: 'Serhiy Prytula Charity Foundation',
        url: 'https://prytulafoundation.org/en',
        img: serhiyPrytula,
        img2: stc2,
    },
];

const supportList = document.querySelector('.support-list');

function createSupportList(arr) {
    return arr
        .map(({ title, url, img, img2 }, idx) => {
            return `<li class="support-item">
            <a class = "support-link" href="${url}" target="_blank" rel="noopener noreferrer nofollow">
                ${(idx + 1).toString().padStart('2', 0)}
                    <img src="${img}" 
                    srcset = "${img} 1x, ${img2} 2x" alt="${title}" loading="lazy" />
            </a>
        </li>`;
        })
        .join('');
}

supportList.innerHTML = createSupportList(organization);

let maxHeight = 0;
let maxPages = 0;
let currentPage = 1;
let isUp = false;

console.log(supportList.scrollHeight);
console.log(supportList.clientHeight);
if (supportList.scrollHeight > supportList.clientHeight) {
    const btnMore = document.querySelector('.support-btn-more');
    supportList.classList.add('list-more');
    btnMore.classList.remove('visually-hidden');
    btnMore.addEventListener('click', handlerClickMore);
}

function handlerClickMore(e) {
    if (isUp) {
        supportList.scrollTop -= supportList.clientHeight;
    } else {
        supportList.scrollTop += supportList.clientHeight;
    }
    scrollBtn(e);
}

function scrollBtn(e) {
    if (supportList.scrollHeight > maxHeight) {
        maxHeight = supportList.scrollHeight;
        maxPages = Math.ceil(maxHeight / supportList.clientHeight);
    }

    if (currentPage !== maxPages && !isUp) {
        currentPage++;
        if (currentPage === maxPages) changeNapr(e);
        return;
    }
    if (currentPage !== 1 && isUp) {
        currentPage--;
        if (currentPage === 1) changeNapr(e);
        return;
    }
}
function changeNapr(e) {
    e.currentTarget.classList.toggle('totop');
    isUp = e.currentTarget.classList.contains('totop');
}

// let itemsVisible;

// function setItemsVisible() {
//     if (window.innerWidth <= 768) {
//         itemsVisible = 4;
//         return;
//     }
//     itemsVisible = 6;
// }

// function scrollBtn() {
//     const position = supportList.scrollTop;
//     const maxPosition = supportList.scrollHeight - supportList.clientHeight;
//     const scrollBottom = maxPosition - position;
//     if (scrollBottom < maxPosition) {
//         btnMore.classList.add('totop');
//     }

//     if (!position) {
//         btnMore.classList.remove('totop');
//     }
// }

// function handlerClickMore() {
//     if (btnMore.classList.contains('totop')) {
//         supportList.scrollTop -= supportList.clientHeight;
//     } else {
//         supportList.scrollTop += supportList.clientHeight;
//     }
//     scrollBtn();
// }
