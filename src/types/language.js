
const VI = 'vi';
const EN = 'en';
const JA = 'ja';
const TypeLanguage = [
    VI,
    EN,
    JA
];
let storedLanguage = localStorage.getItem('language');
if (!(storedLanguage && TypeLanguage.includes(storedLanguage))) {
    storedLanguage = TypeLanguage[1];
}
export { storedLanguage, VI, EN, JA };