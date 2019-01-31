"use strict";

/**
 * РљР»Р°СЃСЃ СЃРѕР·РґР°СЋС‰РёР№ (РёР· С„Р°Р№Р»Р° json), РґРѕР±Р°РІР»СЏСЋС‰РёР№ Рё СѓРґР°Р»СЏСЋС‰РёРµ РѕС‚Р·С‹РІС‹
 */
class Feedback {
    constructor(fileName = "feedback.json", container = ".text_of_feedbacks", formContainer = ".form_for_feedback") {
        this.formContainerClass = formContainer;
        this.containerClass = container;
        this.feedbackArray = [];
        this.fileName = fileName;
        this._getButtonEvent();
    }

    /**
     * РњРµС‚РѕРґ СЃРѕР·РґР°СЋС‰РёРµ СЌР»Р»РµРјРµРЅС‚С‹ РЅР° СЃС‚СЂР°РЅРёС†С‹ РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ РѕС‚Р·С‹РІРѕРІ
     * @param {obj} РѕР±СЉРµРєС‚ СЃ РґР°РЅРЅС‹РјРё РѕС‚Р·С‹РІР°
     */
    _render({
        author,
        text,
        id,
        approved = false
    }) {
        let $wrapper = $('<div/>', {
            class: "feedback-wrapper",
            'data-id': id,
            'data-approved': approved
        });


        let $feedbackName = $('<p/>', {
            class: "feedback-name-p",
            text: `Name: ${author}`
        });

        let $feedbackText = $('<p/>', {
            class: "feedback-text-p",
            text: text
        });

        let $feedbackBtnApprove = $('<button/>', {
            class: "button-approve",
            'data-id': id,
            'data-approved': approved,
            'name': 'approveBtn',
            'text': "Approve feedback"
        });

        if (approved === true) {
            $feedbackBtnApprove.attr("disabled", "disabled")
        }

        let $feedbackBtnRemove = $('<button/>', {
            class: "button-remove",
            'data-id': id,
            'name': 'removeBtn',
            'text': "Remove feedback"
        });

        $feedbackName.appendTo($wrapper);
        $feedbackText.appendTo($wrapper);
        $feedbackBtnApprove.appendTo($wrapper);
        $feedbackBtnRemove.appendTo($wrapper);
        $(this.containerClass).append($wrapper);
    }

    /**
     * РњРµС‚РѕРґ РїРѕР»СѓС‡Р°СЋС‰РёР№ РґР°РЅРЅС‹Рµ РёР· С„Р°Р№Р»Р° Json, РІС‹Р·РІР°РµС‚ РјРµС‚РѕРґ РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ РёС… РЅР° СЃС‚СЂР°РЅРёС†Рµ Рё РґРѕР±Р°РІР»СЏРµС‚
     * РёС… РІ РјР°СЃСЃРёРІ РѕС‚Р·С‹РІРѕРІ
     */
    readJson() {
        fetch(this.fileName)
            .then(result => result.json())
            .then(data => {
                for (let feedbackItem of data) {
                    this._render(feedbackItem);
                    this.feedbackArray.push(feedbackItem);
                }
            });
    }


    /**
     *РњРµС‚РѕРґ РѕР±СЂР°Р±Р°С‚С‹Р°СЋС‰РёР№ СЃРѕР±С‹С‚РёСЏ РѕС‚ РЅР°Р¶Р°С‚РёР№ РєРЅРѕР°РѕРє РЅР° СЃС‚СЂР°РЅРёС†Рµ
     */
    _getButtonEvent() {
        $(this.formContainerClass + " button").on('click', e => {
            e.preventDefault();
            let inputVal = $(this.formContainerClass + " input").val();
            let textareaVal = $(this.formContainerClass + " textarea").val();
            if ($(this.formContainerClass + " input").val() && $(this.formContainerClass + " textarea").val()) {
                this._addFeedback(inputVal, textareaVal);
            }
        });
        $(this.containerClass).on('click', '[name=approveBtn]', e => {
            this._approveFeedback(e.target.dataset.id);
            e.target.setAttribute("disabled", "disabled");
        });

        $(this.containerClass).on('click', '[name=removeBtn]', e => {
            this._removeFeedback(e.target.dataset.id);
            /*  this._approveFeedback*/
        });
    }

    /**
     * РњРµС‚РѕРґ СѓРґР°Р»СЏСЋС‰РёР№ РѕС‚Р·С‹РІ СЃРѕ СЃС‚СЂР°РЅРёС†С‹ Рё РёР· РјР°СЃСЃРёРІР° РѕС‚Р·С‹РІРѕРІ
     * @param id {str} РЅРѕРјРµСЂ РѕС‚Р·С‹РІР°
     */
    _removeFeedback(id) {
        let find = this.feedbackArray.find(feedbackItem => feedbackItem.id === +id);
        if (find) {
            for (let i = 0; i < this.feedbackArray.length; i++) {
                if (find === this.feedbackArray[i]) {
                    this.feedbackArray.splice(i, 1);
                }
            }

            let feedbackElemsLength = $('.feedback-wrapper').length;
            let feedbackElems = $('.feedback-wrapper');
            for (let i = 0; i < feedbackElemsLength; i++) {
                if (id === feedbackElems[i].dataset.id) {
                    $(feedbackElems[i]).remove();
                    return;
                }
            }
        }
    }

    /**
     * РњРµС‚РѕРґ РјРµРЅСЏСЋС‰РёР№ СЃС‚Р°С‚СѓСЃ РѕС‚Р·С‹РІР° РЅР° РѕРґРѕР±СЂРµРЅРЅС‹Р№
     * @param id {str} РЅРѕРјРµСЂ РѕС‚Р·С‹РІР°
     */
    _approveFeedback(id) {
        let find = this.feedbackArray.find(feedbackItem => feedbackItem.id === +id);
        if (find) {
            for (let i = 0; i < this.feedbackArray.length; i++) {
                if (find === this.feedbackArray[i]) {
                    this.feedbackArray[i].approved = true;

                }
            }
            let feedbackElems = $(this.containerClass + ">.feedback-wrapper");
            for (let i = 0; i < feedbackElems.length; i++) {
                feedbackElems[i].remove();
            }

            this.feedbackArray.forEach((item) => {
                this._render(item);
            })
        }
    }

    /**
     * РњРµС‚РѕРґ РґРѕР±Р°РІР»СЏСЋС‰РёР№ РѕС‚Р·С‹РІ РЅР° СЃС‚СЂР°РЅРёС†Сѓ
     * @param inputVal (string} РґР°РЅРЅС‹Рµ РёР· С„РѕСЂРјС‹ РґР»СЏ РІРІРѕРґР° РѕС‚Р·С‹РІРѕРІ
     * @param textareaVal {string} РґР°РЅРЅС‹Рµ РёР· С„РѕСЂРјС‹ РґР»СЏ РІРІРѕРґР° РѕС‚Р·С‹РІРѕРІ
     */
    _addFeedback(inputVal, textareaVal) {
        let lastId = () => {
            let maxId = 0;
            for (let i = 0; i < this.feedbackArray.length; i++) {
                if (this.feedbackArray[i].id > maxId) {
                    maxId = this.feedbackArray[i].id
                }

            }
            return maxId;
        };
        let getMaxId = lastId();
        let newFeedbackObj = {
            author: inputVal,
            text: textareaVal,
            id: ++getMaxId,
            approved: false
        };
        this.feedbackArray.push(newFeedbackObj);
        this._render(newFeedbackObj);
    }


}