const endpoint = "https://hooks.slack.com/services/T055N5YFW/BUMNSA9PV/lvzJP3dkkmquYszmGmvXv2F"

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
    const title = $('input[name=title]').val()
    const description = $('textarea[name=description]').val()
    const language = $('input[name=language]').val()
    const difficulty = $('input[name=difficulty]').val()

    if (title == '') {
        $('input[name=title]').addClass('is-danger')
        $('input[name=title]').focus()
        return false
    } else {
        $('input[name=title]').removeClass('is-danger')
    }
    if (description == '') {
        $('textarea[name=description]').addClass('is-danger')
        $('textarea[name=description]').focus()
        return false
    } else {
        $('textarea[name=description]').removeClass('is-danger')
    }
    if (language == '') {
        $('input[name=language]').addClass('is-danger')
        $('input[name=language]').focus()
        return false
    } else {
        $('input[name=language]').removeClass('is-danger')
    }
    if (difficulty == '') {
        $('input[name=difficulty]').addClass('is-danger')
        $('input[name=difficulty]').focus()
        return false
    } else {
        $('input[name=difficulty]').removeClass('is-danger')
    }

    return true
}

function inputCopy() {
    const title = $('input[name=title]').val()
    const description = $('textarea[name=description]').val().replace(/\n/g,"<br>\n")
    const language = $('input[name=language]').val()
    const difficulty = $('input[name=difficulty]').val()
    const example = $('textarea[name=example]').val().replace(/\n/g,"<br>\n")
    const template = $('textarea[name=template]').val().replace(/\n/g,"<br>\n")

    $('#title').text(title)
    $('#description').html(description)
    $('#language').text(language)
    $('#difficulty').text(difficulty)
    $('#example').html(example)
    $('#template').html(template)

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

    const title = $('#title').text()
    const description = $('#description').text()
    const language = $('#language').text()
    const difficulty = $('#difficulty').text()
    const example = $('#example').text()
    const template = $('#template').text()

    $.ajax({
        type: 'POST',
        url: endpoint,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(
            {
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": title,
                            "emoji": true
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "plain_text",
                            "text": description,
                            "emoji": true
                        }
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "plain_text",
                                "text": `:black_nib: Language : ${language}`,
                                "emoji": true
                            },
                            {
                                "type": "plain_text",
                                "text": `:signal_strength: Difficulty : ${difficulty}`,
                                "emoji": true
                            },
                            {
                                "type": "plain_text",
                                "text": ":calendar: Limit : 2022/10/31",
                                "emoji": true
                            }
                        ]
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "plain_text",
                                "text": `:memo: Example\n ${example}`,
                                "emoji": true
                            }
                        ]
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "mrkdwn",
                                "text": ":page_facing_up: Template\n" + template
                            }
                        ]
                    },
                ]
            },
        ),
        success: out => {
            $('.modal-card-title').text('送信完了')
            $('.modal-card-body').html(out.message + '<br><span>ブラウザを閉じて終了してください</span>')
            $('.modal-card-foot').remove()
        }
    })
}