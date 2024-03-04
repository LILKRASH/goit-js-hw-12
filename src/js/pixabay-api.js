import { clearGallery, appendImageCard, getItemHeight } from "./render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from 'axios';

const inputText = document.querySelector("input");
const formImage = document.querySelector("form");
const loadMoreBtn = document.querySelector(".load-more-button")
const galleryList = document.querySelector(".gallery-list");
const galleryItem = document.querySelector(".gallery-item");

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '42561040-543dc47762d23067e130ec962';
let QUERY = null;
inputText.addEventListener("input", event => {
    QUERY = inputText.value;
    console.log(QUERY);
});

let current_page = 1;

export async function getImages(page = 1) {
    if (page === 1) {
        clearGallery();
    }

    const LINK = `?key=${KEY}&q=${QUERY}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;

    try {
        const response = await axios.get(LINK);

        if (response.status !== 200) {
            throw new Error("Image error");
        }

        const { hits, totalHits } = response.data

        if (hits.length === 0) {
            hideLoader()
            iziToast.warning({
                title: 'Caution',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: "topRight",
            });
        }

        return { hits, totalHits };

    } catch (error) {
        hideLoader()
        iziToast.error({
            title: 'Caution',
            message: 'Error while fetching images from pixabay',
            position: "topRight",
        });
        return { hits: [], totalHits: 0 };
    }
}

formImage.addEventListener("submit", (event) => {
    event.preventDefault();
    QUERY = event.target.elements.value;
    current_page = 1;
    getImages();
    toggleLoadMoreBtn();
});

loadMoreBtn.addEventListener("click", async () => {
    showLoader();
    current_page++;

    try {
        const { hits, totalHits } = await getImages(current_page);

        if (hits.length > 0) {
            galleryList.innerHTML += appendImageCard(hits);
            toggleLoadMoreBtn();

            const galleryItem = document.querySelector(".gallery-item");
            const galleryItemHeight = getItemHeight(galleryItem);

            window.scrollBy({
                top: galleryItemHeight * 2,
                behavior: 'smooth'
            });

            const lightbox = new SimpleLightbox('.gallery-link');
            lightbox.refresh();
        }

        if (current_page * 15 >= totalHits) {
            hideLoader();
            loadMoreBtn.style.display = "none";
            iziToast.info({
                title: 'Caution',
                message: "We`re sorry, but you`ve reached the end of search results.",
                position: "topRight",
            });
        }

    } catch (error) {
        console.log("Error:", error);
    } finally {
        hideLoader();
    }
});

export function toggleLoadMoreBtn() {
    loadMoreBtn.style.display = galleryList.children.length > 0 ? "block" : "none";
}

export function showLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
}

export function hideLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
}
