{/* <div class="productCard">
    <!-- รูปภาพประกอบสินค้า -->
    <img class="productThumbnail" src="https://get.pxhere.com/photo/iPhone-10-11-12-12pro-gadget-games-technology-electronic-device-smartphone-1633608.jpg"/>
    <!-- รายละเอียดสินค้า -->
    <div class="productBottomSheet">
        <!-- ข้อมูลสินค้า -->
        <div class="productInfoContainer">
            <!-- ชื่อสินค้า -->
            <strong class="productName">iPhone 10</strong>
            <!-- ราคาสินค้า -->
            <div class="productPrice">$200</div>
        </div>
        <!-- ปุ่ม add to cart -->
        <button class="addToCart">+</button>
    </div>
</div> */}


let products =[];
const cart = {};

// ใช้อัพเดทราคาสินค้าใน cart
const updateCart = () =>{
    // ตอนเริ่มให้เป็น 0
    let totalPrice =0;
    document.querySelector('#cartSummary_items').replaceChildren([]);

    for(const key of Object.keys(cart)){
        const item = products.find((product) => {
            // เทียบและแปลงเป็นสตริง
            return `${product.id}` === key;
        })

        const quantity = cart[key];
        const price =item.price;

        const itemRow = document.createElement('tr');

        const itemName = document.createElement('th');
        itemName.innerText=item.title;

        const itemQuantity = document.createElement('td');
        itemQuantity.innerText =quantity;

        const itemPrice = document.createElement('td');
        itemPrice.innerText= quantity*price;

        itemRow.append(itemName,itemQuantity,itemPrice);
        document.querySelector('#cartSummary_items').append(itemRow);
        totalPrice=totalPrice + price * quantity;


    }

    document.querySelector('#cartSummary_total').innerText = totalPrice;
}

const hookViewCart = () => {
    const viewCartButton =document.querySelector('#viewCart');
    viewCartButton.addEventListener('click', () => {
        const cartSummary = document.querySelector('#cartSummary');
        const display = cartSummary.style.display;
        if (display === 'none'){
            cartSummary.style.display ='block';
        } else {
            cartSummary.style.display ='none';
        }

    });
}

// สร้าง Card
const createCard = (product) => {
    // สร้าง productCard ที่เป็น div ขึ้นมา อ้างอิงจากบรรทัด 1
    const productCard =document.createElement('div');
    // สร้าง class อ้างอิงจาก บรรทัด 1 เนื่องจากเป็น class
    productCard.className ='productCard';

    // สร้าง image ที่เป็น img ขึ้นไป อ้างอิงจากบรรทัด 3
    const productThumbnail = document.createElement('img');
    // สร้าง  class อ้างอิงจาก บรรทัดที่ 3 เป็น class
    productThumbnail.className ='productThumnail';
    // สร้าง src อ้างจาก บรรทัดที่ 3 เนื่องจากเป็น src
    productThumbnail.src =product.thumbnail;

    const productBottomSheet =document.createElement('div');
    productBottomSheet.className = 'productBottomSheet';

    const productInfoContainer =document.createElement('div');
    productInfoContainer.className ='productInfoContainer';

    const productName =document.createElement('strong');
    productName.className = 'productName';
    // ใช้สำหรับดึงข้อความบน html
    productName.innerText =product.title;

    const productPrice = document.createElement('div');
    productPrice.className ='productPrice';
    // ใช้สำหรับดึงข้อความบน html
    productPrice.innerText =product.price;


    const addToCart = document.createElement('addToCart');
    addToCart.className ='addToCart';
    // ใช้สำหรับดึงข้อความบน html ถ้ารวม +-*/ ต้องใช้ ``
    addToCart.innerText= `+`;

    addToCart.addEventListener('click', () => {
        if (cart[product.id]===undefined) cart[product.id] =0;

        cart[product.id] = cart[product.id]+1;
        updateCart();
    });

    // append จะใช้รับแบบเป็น append(param1,param2)

    // ใส่ productName and productPrice กลับเข้าไปใน productInfoContainer
    productInfoContainer.append(productName,productPrice);

    // หลังจากทำ productInfoContainer ก็จะนำ productInfoContainer และ addToCart กลับเข้าไปใน productBottomSheet
    productBottomSheet.append(productInfoContainer,addToCart);

    // หลังจากทำ productBottomSheet ก็จะนำ productBottomSheet และ productThumbnail กลับเข้าไปใน productCard
    productCard.append(productThumbnail,productBottomSheet);

    // หลังจากนั้นต้องใส่กลับเข้าไปยัง productList
    document.querySelector('#productList').appendChild(productCard);
}

// เรียกใช้ fetch ของเว็บ dummy
const fetchProduct = () => {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((productResponse) => {
            // เรียก products มาใช้
            products = productResponse.products;
            // เอา product ไปใส่ใน card
            products.forEach(product => {
                createCard(product);
            })


            console.log(products);
        });
}


fetchProduct();
hookViewCart();