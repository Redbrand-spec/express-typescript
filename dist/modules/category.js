var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwt = require('jsonwebtoken');
const Key = require('../keys');
const UserCategory = require('../shema/user');
module.exports.category = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const token = req.body.token;
    const decoded = jwt.verify(token, Key.JWT);
    yield UserCategory.findById(decoded.id)
        .then((_request) => __awaiter(this, void 0, void 0, function* () {
        const data = {
            name: req.body.categories.name,
            capacity: req.body.categories.capacity,
            value: req.body.categories.bill,
        };
        _request.categories.push(data);
        yield _request.save()
            .then(() => {
            const UserData = {
                name: _request.name,
                categories: _request.categories,
            };
            res.status(200).json(UserData);
        })
            .catch(() => {
            res.status(400);
        });
    }))
        .catch(() => {
        res.status(400);
    });
    res.status(200).json({ message: '21312' });
});
//# sourceMappingURL=category.js.map