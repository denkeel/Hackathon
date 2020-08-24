
class UniversalDropdown {
    constructor(button, dropdown, classActiveButton, custom) {

        this._init(button, dropdown, classActiveButton, custom);
        this._initEventHandlers();
    };

    _init(button, dropdown, classActiveButton, custom) {
        this.classButton = button;
        this.classDropdown = dropdown;
        this.custom = custom;
        this.$btn = $(button);
        this.$dropdown = $(dropdown);

        this.focusBtnClass = classActiveButton;
    };

    _initEventHandlers() {
        $(this.classButton).on('click', (e) => {
            console.log($(e.target).closest(this.classDropdown).length);
            if (!$(e.target).closest(this.classDropdown).length) {
                this._toggle(e);
            }
        });
        $(document).on('click', (e) => {
            console.log($(e.target).closest(this.classButton).length);
            //отменяем закрытие при клике на блоки из конструктора
            let custom = false;
            if (this.custom !== undefined) {
                custom = $(e.target).closest(this.custom).length;
            }
            if (this.active && !$(e.target).closest(this.classButton).length && !custom) {
                this._hide(e);
            };
        });
    };

    _toggle() {
        this._showStatus(this.active);
        console.log('тоглим');
        this.$dropdown.fadeToggle();
        if (this.focusBtnClass !== undefined) {
            //console.log('ALERT');
            //console.log(this.focusBtnClass);
            this.$btn.toggleClass(this.focusBtnClass);
        }
        if (this.active === false) {
            this.active = true;
        } else {
            this.active = false;
        };
        this._showStatus(this.active);
    };
    
    _hide() {
        this._showStatus(this.active);
        console.log('закрываем');
        this.$dropdown.fadeOut();
        if (this.focusBtnClass !== undefined) {
            //console.log('ALERT');
            this.$btn.removeClass(this.focusBtnClass);
        }
        this.active = false;
        this._showStatus(this.active);
    };

    _showStatus(status) {
        if (status === true) {
            console.log('открыто');
        } else {
            console.log('закрыто');
        };
    };
};