class Dropdown {
    constructor() {
        this.active = false;
    }
};

class BrowseDropdown extends Dropdown {
    constructor() {
        super();
        $('.search__dropdown-button').on('click', (e) => {
            if (!$(e.target).closest('.search__dropdown').length) {
                this._toggle(e);
            };
        });
        $(document).on('click', (e) => {
            if (this.active && !$(e.target).closest('.search__dropdown-button').length) {
                this._hide();
            };
        });
    };


    _toggle(e) {
        console.log('toogle', this.active);
        $('.search__dropdown').fadeToggle();
        $(e.currentTarget).toggleClass('focus');
        $(e.currentTarget).find('.fa-caret-down').toggleClass('rotate');
        if (this.active === false) {
            this.active = true;
        } else {
            this.active = false;
        }
    }

    _hide() {

        console.log(this.active);
        if (this.active) {
            $('.search__dropdown').fadeOut();
            $('.header-left').find('.search__dropdown-button').removeClass('focus');
            $('.header-left').find('.fa-caret-down').removeClass('rotate');
            this.active = false;
        }
    }

    _showStatus(status) {
        if (status === true) {
            console.log('открыто');
        } else {
            console.log('закрыто');
        }
    };
};