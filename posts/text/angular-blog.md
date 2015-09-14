<time>2015-09-14</time>
# Блог на ангуляре

Проблема была в том, что этих платформ для блогов десятки и сотни. Не можешь отпределиться... В общем, решил написать еще один. Свой велосипед.

## Идея

Главная мысль состояла в том, чтобы писать статьи в оффлайн, в своем любом редакторе, на языке markdown и при наличии интернета, заливать в сеть. Так же, хотелось довольно просто навигироваться по ним, да и в целом чтобы вся эта штука была легкой =)

## Реализация

Основу решил писать при помощи AngularJS Framework т.к. больше опыта было именно с ним. Навигацию делал с помощью [ui-router](https://github.com/angular-ui/ui-router). Использовал его раньше, и знал как с ним иметь дело.
Ни с какими БД решил не возиться, а осуществить максимально простую идею. Итого все статьи просто находятся на файловой системе, в формате markdown и скомпилированном из него html. 
Все задачи по компилированию, создаю и переносу файлов выполняет менеджер задач [GulpJS](http://gulpjs.com/).
В его обязанности входит:

- Создание сервера, для локальной работы с блогом.
- Анализ markdown файлов и построение json файла.

*(json файл содержит дату, заголовок, название markdown файла и еще несколько дополнительных полей, для облегченной обработке в меню навигации)*

- Компилирование markdown в html.
- Компилирование less в css.
- Минификация css.

Так gulp содержит задачи для работы с git, чтобы одной командой добавить, закомитить и запушить блог на github репозиторий.

### Навигация

Статью в меню навигации сортируются по годам и месяцам, первыми идут самые новые. Для обратного вывода статей нужно убрать классы содержащие окончание **_reverse** где это необходимо. Изначально меню свернуто, при клике на год раскрываются месяцы, ри клике на месяц - посты.
Если url не указываю на какую-нибудь имеющуюся статью, то при загрузке будет отображена последняя написанная статья.

Дата, которая используется для сортировке в меню, пишет сам пользователь в теге **\<time\>**. Это удобно для переноса статей с других ресурсов, и указания даты написания их вручную ([Как например эта статья](http://feelenergycb.github.io/blog/#/css3-pseudoclasses)). Формат даты может быть любой, который подходить для создания в конструкторе new Date() javascript'a. Главное чтобы дата содержала год и месяц, для корректной сортировки.

Так же каждая статья должна содержать только 1 h1 заголовок (в markdown символ **\#**). Он используется для названии статьи в навигационном меню. Если название длинное, то оно в навигационном меню обрежется символам троеточие **...**

Остальное содержание статьи может быть любым. Компилятор markdown так же позволяет писать html теги, если это необходимо.

### Стилизация

Стили хранятся в файле **assets/less/style.less** и при запущенном превью автоматически компилируются в **assets/css/style.css**. Файл стилей содержит минимум, для корректного отображения блога, и полностью открыт для кастомизации. Стили для самой статьи начинаются с класса **.article**.

## Планы

Исходники данной блог-платформы расположены в [этом](https://github.com/FeelEnergyCB/blogEngine) github репозитории с подробной инструкцией как ей пользоваться.
В ближайших планах:

- оптимизация и улучшение кода.
- создание дополнительных тем для блога.
- расширение функционала.

Если у Вас есть какие-либо идеи, замечания или предложения, пишите мне на почту [mikita.lisavets@gmail.com](mailto:mikita.lisavets@gmail.com), либо в issues на [github](https://github.com/FeelEnergyCB/blogEngine/issues).