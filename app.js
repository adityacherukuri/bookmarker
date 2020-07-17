//Display the items in local storage(if already present) immediately after loading the page.
document.addEventListener('DOMContentLoaded', displayBookmarks);
//function to delete the bookmarks from local storage and from the diaplay
function deleteBookMark(siteurl){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(let i = 0;i < bookmarks.length;i++){
        if(bookmarks[i].url === siteurl){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    //update the display after deleting a bookmark
    displayBookmarks();
    //console.log(siteurl);
}

//function to render the bookmarks on webpage from the local storage.
function displayBookmarks(){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let display = document.getElementById('display-bookmarks');
    console.log(bookmarks);
    display.innerHTML = '';
    for(let i = 0;i < bookmarks.length;i++){
        let sitename =  bookmarks[i].name;
        let siteurl = bookmarks[i].url;
        display.innerHTML += '<div class="container p-3 my-3 bg-secondary text-white">'+
                             '<h3>'+sitename+
                             ' <a class="btn btn-primary" target="_blank" href="'+siteurl+'">Visit</a>'+
                             ' <a onClick="deleteBookMark(\''+siteurl+'\')" class="btn btn-danger" href="#">Delete</a>'+
                             '</h3>'+
                             '</div>'; 
    }
    //console.log(bookmarks);
}

document.getElementById('my-form').addEventListener('submit', saveBookmark);
//function to add the bookmarks to local storage
function saveBookmark(s){
    s.preventDefault();
    const sitename = document.getElementById('sitename').value;
    const siteurl = document.getElementById('url').value;

    if(!formValidation(sitename,siteurl)){
        return false;
    }

    const bookmark = {
        name: sitename,
        url: siteurl
    };
    if(localStorage.getItem('bookmarks') === null){
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    //update the display
    displayBookmarks();
    //reset the form fields
    document.getElementById('my-form').reset();
    // console.log(sitename,siteurl);
    // console.log(bookmark);
}

//form validation
function formValidation(sitename,siteurl){
    if(sitename === ''|| siteurl === ''){
        alert('Enter all the fields...');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!siteurl.match(regex)) {
        alert("Invalid URL, Try Again...");
        return false;
    }
    return true;
}