//用户登录和注册的表单验证通用代码

/**
 * 对某一个表单验证的构造函数
 */

class FieldValidator{
    /**
     * 
     * @param {String} txtId 文本框的ID
     * @param {Function} validatorFunc 
     */
    constructor(txtId,validatorFunc){
        this.input = $('#' + txtId);
        this.p = this.input.nextElementSibling;
        this.validatorFunc = validatorFunc;
        this.input.onblur = () => {
            this.validator();
        }
    }

    /**
     * 验证
     * 失败返回false
     * 成功过返回true
     */
    async validator() {
        const err = await this.validatorFunc(this.input.value);
        if(err){
            this.p.innerHTML = err;
            return false;
        }else{
            this.p.innerHTML = "";
            return true;
        }
    }

    /**
     * 对传入的所有验证器一起验证，如果所有验证器都返回true那就返回true，否则返回false
     * @param  {...any} validators 
     */
    static async validator(...validators) {
        const valArr = validators.map(v => v.validator());
        const result = await Promise.all(valArr);
        return result.every(r => r);
    }
}
