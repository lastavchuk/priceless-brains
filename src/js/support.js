import stc from '../images/js-project-png/STC_x1.png';
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
    },
    {
        title: 'Project HOPE',
        url: 'https://www.projecthope.org/country/ukraine/',
        img: hoppe,
    },
    {
        title: 'UNITED24',
        url: 'https://u24.gov.ua/uk',
        img: united,
    },
    {
        title: 'International Medical Corps',
        url: 'https://internationalmedicalcorps.org/country/ukraine/',
        img: international,
    },
    {
        title: 'Medicins Sans Frontieres',
        url: 'https://www.msf.org/ukraine',
        img: medicins,
    },
    {
        title: 'RAZOM',
        url: 'https://www.razomforukraine.org/',
        img: razom,
    },
    {
        title: 'Action against hunger',
        url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
        img: action,
    },
    {
        title: 'World vision',
        url: 'https://www.wvi.org/emergencies/ukraine',
        img: worldVision,
    },
    {
        title: 'Serhiy Prytula Charity Foundation',
        url: 'https://prytulafoundation.org/en',
        img: serhiyPrytula,
    },
];

const supportList = document.querySelector('.support-list');
const btnMore = document.querySelector('.support-btn-more');

function createSupportList(arr) {
    console.log(arr);
    return arr
        .map(({ title, url, img }, idx) => {
            return `<li class="support-item">
            <a class = "support-link" href="${url}" target="_blank" rel="noopener noreferrer nofollow">
                ${(idx + 1)
                    .toString()
                    .padStart(
                        '2',
                        0
                    )}<img src="${img}" alt="${title}" loading="lazy" />
            </a>
        </li>`;
        })
        .join('');
}

supportList.insertAdjacentHTML('beforeend', createSupportList(organization));
console.log(supportList);

btnMore.addEventListener('click', handlerClickMore);

let itemsVisible;

function setItemsVisible() {
    if (window.innerWidth <= 768) {
        itemsVisible = 4;
        return;
    }
    itemsVisible = 6;
}

function scrollBtn() {
    const position = supportList.scrollTop;
    const maxPosition = supportList.scrollHeight - supportList.clientHeight;
    const scrollBottom = maxPosition - position;
    if (scrollBottom < maxPosition) {
        btnMore.classList.add('totop');
    }

    if (!position) {
        btnMore.classList.remove('totop');
    }
}

function handlerClickMore() {
    if (btnMore.classList.contains('totop')) {
        supportList.scrollTop -= supportList.clientHeight;
    } else {
        supportList.scrollTop += supportList.clientHeight;
    }
    scrollBtn();
}
