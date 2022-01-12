const endpoint = "https://script.google.com/macros/s/AKfycbxbH5AhKk3nUogybpNyQCeBv9ZbmM2a6OSRc-0qp6O1QFheB89yn2nBoOIAt23CtSuYiQ/exec";

function openModal() {
    if (validateInput()) {
        inputCopy()
        const modal = $('#modal')
        modal.addClass('is-active')
    }
}

function closeModal() {
    const modal = $('#modal')
    modal.removeClass('is-active')
}

function validateInput() {
    const name = $('input[name=name]').val()
    const message = $('textarea[name=message]').val()
    if (name == '') {
        $('input[name=name]').addClass('is-danger')
        $('input[name=name]').focus()
        return false
    } else {
        $('input[name=name]').removeClass('is-danger')
    }
    if (message == '') {
        $('textarea[name=message]').addClass('is-danger')
        $('textarea[name=message]').focus()
        return false
    } else {
        $('textarea[name=message]').removeClass('is-danger')
    }
    return true
}

function inputCopy() {
    const name = $('input[name=name]').val()
    const answer1 = $('input[name=answer1]:checked').val();
    const answer2 = $('input[name=answer2]:checked').val();
    const answer3 = $('input[name=answer3]:checked').val();
    const message = $('textarea[name=message]').val()

    $('#name').text(name)
    $('#answer1').text(answer1)
    $('#answer2').text(answer2)
    $('#answer3').text(answer3)
    $('#message').text(message)
}

function closeAllModals() {
(document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal);
});
}

function post() {
    done = $('.modal-card-title').text()
    if (done == '送信完了') {
        return true
    }
    const name = $('#name').text()
    const answer1 = $('#answer1').text()
    const answer2 = $('#answer2').text()
    const answer3 = $('#answer3').text()
    const message = $('#message').text()

    $.ajax({
        type: 'GET',
        url: endpoint,
        dataType: 'jsonp',
        data: {
            name: name,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            message: message
        },
        success: out => {
            $('.modal-card-title').text('送信完了')
            $('.modal-card-body').html(out.message + '<br><span>ブラウザを閉じて終了してください</span>')
            $('.modal-card-foot').remove()
        }
    })
}