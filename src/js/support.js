const organization = [
    {
        title: 'Save the Children',
        url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
        img: null,
    },
    {
        title: 'Project HOPE',
        url: 'https://www.projecthope.org/country/ukraine/',
        img: null,
    },
    {
        title: 'UNITED24',
        url: 'https://u24.gov.ua/uk',
        img: null,
    },
    {
        title: 'International Medical Corps',
        url: 'https://internationalmedicalcorps.org/country/ukraine/',
        img: null,
    },
    {
        title: 'Medicins Sans Frontieres',
        url: 'https://www.msf.org/ukraine',
        img: null,
    },
    {
        title: 'RAZOM',
        url: 'https://www.razomforukraine.org/',
        img: null,
    },
    {
        title: 'Action against hunger',
        url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
        img: null,
    },
    {
        title: 'World vision',
        url: 'https://www.wvi.org/emergencies/ukraine',
        img: null,
    },
    {
        title: 'Serhiy Prytula Charity Foundation',
        url: 'https://prytulafoundation.org/en',
        img: null,
    },
];

const elements = {
    supportList: document.querySelector('.support-list'),
    btnMore: document.querySelector('.support-btn-more'),
    btnPrev: document.querySelector('.support-btn-prev'),
};

let amount = 4;

btnMore.addEventListener('click', handlerClickMore);
btnPrev.addEventListener('click', handlerClickPrev);

function createSupportList(organization) {
    return organization
        .map(({ title, url, img }) => {
            `<li class="support-item">
            <a href="${url}" target="_blank" rel="noopener noreferrer nofollow">
                <img src="${img}" alt="${title}" />
            </a>
        </li>`;
        })
        .join('');
}
supportList.insertAdjacentHTML('beforeend', createSupportList(organization));


function handlerClickMore() {
    if (amount < supportList.length {
        
    })
}
