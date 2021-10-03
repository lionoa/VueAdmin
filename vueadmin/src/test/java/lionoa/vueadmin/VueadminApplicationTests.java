package lionoa.vueadmin;

import lionoa.vueadmin.common.dto.SysMenuDto;
import lionoa.vueadmin.controller.BaseController;
import lionoa.vueadmin.entity.SysMenu;
import lionoa.vueadmin.entity.SysUser;
import lionoa.vueadmin.service.SysMenuService;
import lionoa.vueadmin.service.SysUserService;
import lombok.AllArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@SpringBootTest
class VueadminApplicationTests {
    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private BCryptPasswordEncoder cryptPasswordEncoder;

    @Test
    void contextLoads() {
        SysUser hello = sysUserService.getByUsername("hello");
        hello.setPassword(cryptPasswordEncoder.encode("123456"));
        sysUserService.updateById(hello);
    }

}
