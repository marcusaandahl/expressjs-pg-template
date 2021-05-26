$('#newUserBtn').on('click', ()=> {
    console.log('blevl');
    $.ajax({
        method: "POST",
    })
    .done(function(msg) {
        console.log("DONE");
    });
});